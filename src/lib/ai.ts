import OpenAI from "openai";
import type { MoodId } from "@/data/moods";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const moodPrompts: Record<MoodId, string> = {
  grammar:
    "You are a grammar and spelling expert. Fix all grammar, spelling, and punctuation errors in the text. Keep the original meaning and structure intact. Do not use em dashes.",
  "git-commit":
    "You are a git commit message expert. Rewrite the text as a clean, well-structured git commit message. Follow best practices for commit messages. Do not use em dashes.",
  email:
    "You are an email writing expert. Rewrite the text as a polished email. Maintain the original intent and key information. Do not use em dashes.",
  costume:
    "You are a creative writing assistant. Improve the text while keeping the original meaning. Do not use em dashes.",
};

export async function improveText(
  content: string,
  moodId: MoodId,
  styleTag?: string,
): Promise<string> {
  const baseInstruction = moodPrompts[moodId];
  const styleClause = styleTag ? ` Apply a ${styleTag} tone and style.` : "";

  const prompt = `${baseInstruction}${styleClause}

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
