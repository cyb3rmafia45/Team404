# 🌿 MindMend
### AI-Powered Healthcare & Wellness Web Application

MindMend is an AI-powered healthcare and wellness web application designed to help users monitor their daily well-being through simple health check-ins. By analysing users' mood, sleep, and energy levels, the application provides personalised wellness insights and encourages healthier lifestyle habits.

---

# 📖 Project Overview

Maintaining good mental and physical health can be challenging in today's busy lifestyle. Many people fail to recognise unhealthy patterns until they begin affecting their daily lives.

MindMend provides an intelligent and user-friendly platform where users can regularly log their wellness information and receive AI-generated guidance to improve their overall health.

---

# 🎯 Problem Statement

Many individuals struggle to monitor their mental and physical wellness consistently. Existing healthcare platforms are often complex, expensive, or focused only on medical conditions rather than preventive wellness.

MindMend aims to provide an accessible, AI-assisted solution that encourages users to build healthier habits through regular self-assessment and personalised recommendations.

---

# 💡 Solution

MindMend allows users to record their daily mood, sleep quality, and energy levels. The application uses AI to analyse these inputs and generate short, meaningful wellness insights that help users understand their health patterns and make informed lifestyle choices.

---

# ✨ Key Features

- 🤖 AI-powered wellness insights
- 😊 Daily mood tracking
- 😴 Sleep monitoring
- ⚡ Energy level analysis
- 📊 Wellness dashboard
- 💬 Personalised health recommendations
- 📱 Responsive and user-friendly interface

---

# 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Netlify Functions

### AI Integration
- Claude AI API

### Hosting
- Netlify

---

# 📷 Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f4c9d837-adc4-4aaa-9d96-e5d09f38609d" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d4b3d38f-ac6d-43ec-a5cb-e35515076795" />



- Home Page
- AI Wellness Chat
- Mood Tracker
- Dashboard
- Health Insights

---

# 🚀 Future Scope

- Doctor consultation integration
- Emergency SOS support
- Wearable device integration
- Multi-language support
- Health report generation
- AI-based health prediction
- Appointment booking

---

# 👥 Team

**Team 404**

- Synthia Debnath
- Adarsh Choudhury
- Aritra Bhattacharya

---

# 🌐 Live Demo

**Website:** https://team404-two.vercel.app/

**GitHub Repository:** https://github.com/cyb3rmafia45/Team404

---

# ⚙ Developer Setup


#MindMend 🌿
A tiny, calm wellness check-in app. Log your mood, sleep, and energy once a
day. An AI (Google Gemini — free, no credit card needed) reads your entries
and gives you a kind, short insight. Over time you get a dashboard showing
your patterns.

This guide explains every step slowly. No coding needed — just copy-paste
and click.

---

## Part 0 — What you already have

```
mindmend/
  index.html          <- the page you see
  style.css           <- how it looks
  app.js               <- what happens when you click things
  .gitignore
  README.md            <- this file
  api/
    insight.js          <- the "AI brain" (runs on Vercel, keeps your key secret)
```

---

## Part 1 — Get a free Gemini API key (no credit card needed)

1. Go to https://aistudio.google.com
2. Sign in with any Google account
3. Click **Get API key** (top-left menu, or search for it if the layout looks different)
4. Click **Create API key**
5. Copy the key that appears — paste it somewhere safe (like your phone Notes app) for a moment.
   ⚠️ Never share this key publicly or put it directly in your GitHub code.

---

## Part 2 — Put this project on GitHub

1. Go to https://github.com, sign up / log in
2. Click **+** (top right) → **New repository**
3. Name it your **team's name** exactly (per the hackathon rules)
4. Click **Create repository**
5. Click **uploading an existing file** (small link under the code box)
6. Drag in the 5 loose files: `index.html`, `style.css`, `app.js`, `.gitignore`, `README.md`
7. Click **Commit changes**
8. Now add the AI function file properly:
   - Click **Add file → Create new file**
   - In the filename box, type exactly: `api/insight.js`
     (the slash makes GitHub create the `api` folder automatically)
   - Paste in the `insight.js` code (ask me and I'll give it to you again anytime)
   - Click **Commit changes**

Your repo should now show 5 files plus an `api` folder containing `insight.js`.

---

## Part 3 — Host it on Vercel

1. Go to https://vercel.com, sign up / log in — choose **"Continue with GitHub"**
2. Click **Add New... → Project**
3. Find your team's repo in the list, click **Import**
4. Vercel will show project settings — you don't need to change anything
   (leave Framework Preset as "Other" if it asks)
5. Click **Deploy**
6. Wait about a minute — Vercel gives you a live link like
   `https://your-repo-name.vercel.app`

---

## Part 4 — Add your secret Gemini key to Vercel

1. On your project page in Vercel, click **Settings** (top tab)
2. Click **Environment Variables** (left menu)
3. Fill in:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: paste your Gemini key from Part 1
4. Click **Save**
5. Go to the **Deployments** tab
6. Click the **... (three dots)** next to your latest deployment → **Redeploy**
7. Wait about a minute for it to finish

---

## Part 5 — Test it

1. Open your live link (e.g. `https://your-repo-name.vercel.app`)
2. Move the sliders, type a sleep number, click **Save today's check-in**
3. Within a few seconds, an AI insight should appear below the button
4. Click the **Patterns** tab to see your day strip and chart

If it says "Couldn't reach the AI insight service" — double-check:
- The key name in Vercel is exactly `GEMINI_API_KEY`
- You redeployed *after* adding it (Part 4, step 6)

---

## Part 6 — Record your demo video (under 2 minutes)

1. (10s) "MindMend helps people notice patterns in their mood, sleep, and
   energy — without needing a therapist appointment."
2. (25s) Show the check-in screen, move sliders, type a note, hit save —
   show the AI insight appearing.
3. (10s) Explain: "This uses Google Gemini to read your entry and give a
   kind, specific observation — never a diagnosis."
4. (30s) Switch to **Patterns** tab. Show the day strip and the mood/energy
   chart.
5. (20s) Click **Generate this week's summary**, show the AI's weekly
   summary appearing.
6. (10s) Close: "Built as a simple, free web app — HTML/JS frontend, a
   serverless function, and Gemini for the insights, hosted on Vercel."

---

## Part 7 — Submit

1. Make sure your latest code is on GitHub (Part 2) and your Vercel site
   works (Part 5)
2. Upload your GitHub repo link + demo video to the hackathon portal
   before **12th August**

---

## Optional: adding fake test data quickly

To make your demo video look good, open your browser's console (press F12)
on your live site, and paste:

```javascript
localStorage.setItem("mindmend_entries", JSON.stringify([
  {date:"2026-07-22", mood:4, energy:3, sleep:5, note:"tired week"},
  {date:"2026-07-23", mood:5, energy:5, sleep:6, note:""},
  {date:"2026-07-24", mood:6, energy:6, sleep:7, note:"felt better"},
  {date:"2026-07-25", mood:7, energy:6, sleep:7.5, note:""},
  {date:"2026-07-26", mood:8, energy:7, sleep:8, note:"great day"},
  {date:"2026-07-27", mood:7, energy:7, sleep:7, note:""}
]));
```

Then refresh the page and click the **Patterns** tab.
