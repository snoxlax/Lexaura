"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { MOOD_IDS } from "@/data/moods";

export async function deleteText(textId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existingText = await prisma.letter.findUnique({
      where: { id: textId, userId },
    });

    if (!existingText) {
      throw new Error("Text not found");
    }

    await prisma.letter.delete({
      where: { id: textId, userId },
    });

    revalidatePath("/dashboard");
    for (const id of MOOD_IDS) {
      revalidatePath(`/editor/${id}`);
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error deleting text:", message);
    throw new Error("Failed to delete text");
  }
}
