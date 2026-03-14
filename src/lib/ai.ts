import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // your OpenAI key here
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function improveText(
  content: string,
  mood: string,
): Promise<string> {
  const prompt = `Please improve the following text to match a ${mood} tone and style. 
Fix only grammar and punctuation errors. dont use em dash. Keep the original meaning.

${content}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message?.content?.trim() || "";
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error improving text:", message);
    throw new Error("Failed to improve text");
  }
}
