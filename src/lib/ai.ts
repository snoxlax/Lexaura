import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Get the Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;

// Helper function to improve text based on mood
export async function improveText(content: string, mood: string) {
  const prompt = `Please improve the following text to match a ${mood} tone and style. 
Just fix grammar and punctuation errors. while keeping the original meaning of the text.

${content}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating improved text:", error);
    throw new Error("Failed to improve text");
  }
}

// Helper function to generate text from a prompt
export async function generateText(prompt: string, mood: string) {
  const enhancedPrompt = `Write a ${mood} text based on this prompt: ${prompt}`;

  try {
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
}
