export default async function handler(req, res) {
  console.log("API Key exists:", !!
  process.env.GEMINI_API_KEY);
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, entry, recent } = req.body;

    let prompt = "";

    if (type === "daily") {
      prompt = `You are a warm, supportive wellness companion.

Today's check-in:
Mood: ${entry.mood}/10
Energy: ${entry.energy}/10
Sleep: ${entry.sleep ?? "Not logged"} hours
Note: ${entry.note || "No note"}

Recent history:
${JSON.stringify(recent)}

Write 2-3 short supportive sentences.
Mention one pattern if you notice one.
Never diagnose.
Keep it under 45 words.`;
    } else {
      prompt = `Here are the user's last seven check-ins:

${JSON.stringify(recent)}

Write a kind weekly summary in 3-4 sentences.
Mention one positive observation and one gentle suggestion.
Never diagnose.
Keep it under 70 words.`;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("Gemini response:",
    JSON.stringify(data));

    if (!response.ok) {
      return res.status(500).json({
        insight: null,
        error: data.error?.message || "Gemini API Error"
      });
    }

    const insight =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No insight generated.";

    return res.status(200).json({ insight });

  } catch (err) {
      console.error(err);
    
      return res.status(500).json({
        insight: null,
        error: String(err)
    });
  }
}
