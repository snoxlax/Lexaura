"use server";

import { LetterValues, letterDocumentSchema } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { improveText } from "@/lib/ai";

export async function saveLetter(values: LetterValues) {
  const { id } = values;
  const letterValues = letterDocumentSchema.parse(values);

  console.log("received letter values", values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const existingLetter = id
    ? await prisma.letter.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingLetter) {
    throw new Error("Letter not found");
  }

  if (id) {
    return prisma.letter.update({
      where: { id },
      data: {
        ...letterValues,
        updatedAt: new Date(),
      },
    });
  } else {
    return prisma.letter.create({
      data: {
        ...letterValues,
        userId,
      },
    });
  }
}

export async function improveLetterText(content: string, mood: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (!content.trim()) {
    throw new Error("No content to improve");
  }

  try {
    const improvedContent = await improveText(content, mood || "professional");
    return { improvedContent };
  } catch (error) {
    console.error("Error improving text:", error);
    throw new Error("Failed to improve text. Please try again.");
  }
}
