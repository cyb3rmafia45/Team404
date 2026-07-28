// ============================================================
// This code runs on Netlify's server, NOT in the browser.
// That's important: it keeps your Claude API key secret.
// The browser calls this function instead of calling Claude directly.
// ============================================================

exports.handler = async function (event) {
  try {
    const body = JSON.parse(event.body);
    const { type, entry, recent } = body;

    let prompt;

    if (type === "daily") {
      prompt = `You are a warm, non-clinical wellness companion (NOT a therapist or doctor — never diagnose).
A user just logged today's check-in:
- Mood: ${entry.mood}/10
- Energy: ${entry.energy}/10
- Sleep: ${entry.sleep ?? "not logged"} hours
- Note: "${entry.note || "(no note)"}"

Here is their recent history (most recent last): ${JSON.stringify(recent)}

In 2-3 short sentences, give a kind, specific, plain-language observation or gentle suggestion.
Notice patterns if you see them (e.g. sleep vs mood). Do not diagnose. Do not use clinical labels.
Keep it under 45 words.`;
    } else {
      prompt = `You are a warm, non-clinical wellness companion (NOT a therapist or doctor — never diagnose).
Here are a user's last 7 daily check-ins: ${JSON.stringify(recent)}

Write a short, kind weekly summary (3-4 sentences, under 70 words) in plain language.
Mention one real pattern you notice (mood, energy, or sleep trends) and end with one gentle, practical suggestion.
Do not diagnose. Do not use clinical labels.`;
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ insight: null, error: data.error.message }),
      };
    }

    const insight = data.content?.[0]?.text?.trim() || "No insight generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ insight }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ insight: null, error: err.message }),
    };
  }
};
