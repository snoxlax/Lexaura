"use server";

import { LetterValues, letterDocumentSchema } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { improveText } from "@/lib/ai";
import { isMoodId } from "@/data/moods";
import { revalidatePath } from "next/cache";

export async function saveLetter(values: LetterValues) {
  const { id } = values;
  const letterValues = letterDocumentSchema.parse(values);

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

  const saved = id
    ? await prisma.letter.update({
        where: { id },
        data: {
          ...letterValues,
          updatedAt: new Date(),
        },
      })
    : await prisma.letter.create({
        data: {
          ...letterValues,
          userId,
        },
      });

  if (letterValues.mood) {
    revalidatePath(`/editor/${letterValues.mood}`);
  }
  revalidatePath("/dashboard");

  return saved;
}

export async function improveLetterText(
  content: string,
  moodId: string,
  styleTag?: string,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (!content.trim()) {
    throw new Error("No content to improve");
  }

  if (!isMoodId(moodId)) {
    throw new Error("Invalid mood");
  }

  try {
    const improvedContent = await improveText(content, moodId, styleTag);
    return { improvedContent };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error improving text:", message);
    throw new Error("Failed to improve text. Please try again.");
  }
}
