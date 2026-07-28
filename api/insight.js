export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, entry, recent } = req.body;

    let prompt;

    if (type === "daily") {
      prompt = `You are a warm, non-clinical wellness companion (NOT a therapist or doctor).

A user just logged today's check-in:
- Mood: ${entry.mood}/10
- Energy: ${entry.energy}/10
- Sleep: ${entry.sleep ?? "not logged"} hours
- Note: "${entry.note || "(no note)"}"

Recent history:
${JSON.stringify(recent)}

In 2-3 short sentences, give a kind, supportive observation.
Keep it under 45 words.`;
    } else {
      prompt = `Here are the user's recent check-ins:
${JSON.stringify(recent)}

Write a short weekly summary (3-4 sentences).
Mention one pattern and one gentle suggestion.
Keep it under 70 words.`;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        insight: null,
        error: data.error?.message || "Gemini API Error",
      });
    }

    const insight =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No insight generated.";

    return res.status(200).json({ insight });
  } catch (err) {
    return res.status(500).json({
      insight: null,
      error: err.message,
    });
  }
}
