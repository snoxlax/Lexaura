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
Fix only grammar and punctuation errors. Keep the original meaning.

${content}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gemini-1.5-flash",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
    });

    console.log(response.choices[0].message?.content?.trim() || "");
    return response.choices[0].message?.content?.trim() || "";
  } catch (error) {
    console.error("Error improving text:", error);
    throw new Error("Failed to improve text");
  }
}
