// ============================================================
// MindMend — app.js
// This file does 3 jobs:
//   1. Remember your check-ins (using the browser's localStorage —
//      no database needed, it just lives in your browser).
//   2. Send your check-in to a tiny serverless function that asks
//      Claude for a personalized insight.
//   3. Draw the dashboard (day strip + chart + weekly summary).
// ============================================================

const STORAGE_KEY = "mindmend_entries";

// ---------- Storage helpers ----------
function loadEntries() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}
function todayStr() {
  return new Date().toISOString().slice(0, 10); // "2026-07-14"
}

// ---------- Tab switching ----------
const tabButtons = document.querySelectorAll(".tab-btn");
const views = document.querySelectorAll(".view");
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    views.forEach(v => v.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("view-" + btn.dataset.view).classList.add("active");
    if (btn.dataset.view === "dashboard") renderDashboard();
  });
});

// ---------- Live slider labels ----------
const moodInput = document.getElementById("mood");
const moodValue = document.getElementById("mood-value");
moodInput.addEventListener("input", () => (moodValue.textContent = moodInput.value));

const energyInput = document.getElementById("energy");
const energyValue = document.getElementById("energy-value");
energyInput.addEventListener("input", () => (energyValue.textContent = energyInput.value));

// ---------- Submit check-in ----------
const submitBtn = document.getElementById("submit-btn");
const insightBox = document.getElementById("insight-box");
const insightText = document.getElementById("insight-text");

submitBtn.addEventListener("click", async () => {
  const entry = {
    date: todayStr(),
    mood: Number(moodInput.value),
    energy: Number(energyInput.value),
    sleep: Number(document.getElementById("sleep").value) || null,
    note: document.getElementById("note").value.trim(),
  };

  submitBtn.textContent = "Saving...";
  submitBtn.disabled = true;

  // Save it (replace today's entry if it already exists)
  let entries = loadEntries();
  entries = entries.filter(e => e.date !== entry.date);
  entries.push(entry);
  saveEntries(entries);

  // Ask the AI for a short personalized insight
  try {
    const recent = entries.slice(-7); // last 7 entries for context
    const res = await fetch("/api/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "daily", entry, recent }),
    });
    const data = await res.json();
    insightText.textContent = data.insight || "Thanks for checking in today.";
  } catch (err) {
    insightText.textContent =
      "Saved! (Couldn't reach the AI insight service — check your API key setup.)";
  }

  insightBox.classList.remove("hidden");
  submitBtn.textContent = "Save today's check-in";
  submitBtn.disabled = false;
});

// ---------- Dashboard rendering ----------
let chartInstance = null;

function renderDashboard() {
  const entries = loadEntries().sort((a, b) => (a.date > b.date ? 1 : -1));
  const emptyState = document.getElementById("empty-state");

  if (entries.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  renderDayStrip(entries);
  renderChart(entries);
}

// Signature element: last 7 days as a row of tiles, height = mood level
function renderDayStrip(entries) {
  const strip = document.getElementById("day-strip");
  strip.innerHTML = "";

  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const found = entries.find(e => e.date === dateStr);
    last7.push({ dateStr, entry: found, label: d.toLocaleDateString(undefined, { weekday: "short" })[0] });
  }

  last7.forEach(day => {
    const tile = document.createElement("div");
    if (day.entry) {
      const heightPct = 15 + (day.entry.mood / 10) * 85; // 15%-100%
      const hue = 10 + (day.entry.mood / 10) * 140; // red -> green
      tile.className = "day-tile";
      tile.style.height = heightPct + "%";
      tile.style.background = `hsl(${hue}, 45%, 55%)`;
      tile.title = `${day.dateStr}: mood ${day.entry.mood}/10`;
    } else {
      tile.className = "day-tile empty";
    }
    const label = document.createElement("span");
    label.className = "day-label";
    label.textContent = day.label;
    tile.appendChild(label);
    strip.appendChild(tile);
  });
}

function renderChart(entries) {
  const ctx = document.getElementById("trend-chart").getContext("2d");
  const last14 = entries.slice(-14);

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: last14.map(e => e.date.slice(5)), // "MM-DD"
      datasets: [
        {
          label: "Mood",
          data: last14.map(e => e.mood),
          borderColor: "#D9A45B",
          backgroundColor: "rgba(217,164,91,0.15)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Energy",
          data: last14.map(e => e.energy),
          borderColor: "#7FA69B",
          backgroundColor: "rgba(127,166,155,0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: { y: { min: 0, max: 10 } },
      plugins: { legend: { position: "bottom" } },
    },
  });
}

// ---------- Weekly summary ----------
document.getElementById("summary-btn").addEventListener("click", async () => {
  const btn = document.getElementById("summary-btn");
  const summaryText = document.getElementById("summary-text");
  const entries = loadEntries().slice(-7);

  if (entries.length === 0) {
    summaryText.textContent = "Log a few check-ins first, then come back for your summary.";
    return;
  }

  btn.textContent = "Thinking...";
  btn.disabled = true;

  try {
    const res = await fetch("/api/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "weekly", recent: entries }),
    });
    const data = await res.json();
    summaryText.textContent = data.insight || "No summary available right now.";
  } catch (err) {
    summaryText.textContent = "Couldn't reach the AI service — check your API key setup.";
  }

  btn.textContent = "Generate this week's summary";
  btn.disabled = false;
});

// Initial render if dashboard happens to be active on load
if (document.getElementById("view-dashboard").classList.contains("active")) {
  renderDashboard();
}
