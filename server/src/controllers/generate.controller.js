import { generateContent as generateWithGemini } from "../services/gemini.service.js";

export const generateContent = async (req, res) => {
  try {
    const {
      platform,
      tone,
      topic,
      includeEmojis,
      creativity,
    } = req.body;

    if (!topic) {
      return res.status(400).json({
        error: "Topic is required",
      });
    }

    const prompt = `
You are an expert social media copywriter.

Generate a ${tone} social media post.

Requirements:
- Platform: ${platform}
- Topic: ${topic}
- Creativity Level: ${creativity}/100
- Include Emojis: ${includeEmojis ? "Yes" : "No"}

Rules:
- Write naturally.
- Make it engaging.
- Include hashtags if appropriate.
- Optimize for the selected platform.
- Return only the final content.
`;

    const result = await generateWithGemini(prompt);

    res.json({
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate content",
    });
  }
};