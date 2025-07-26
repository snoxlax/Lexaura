"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteText(textId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Check if the text exists and belongs to the user
    const existingText = await prisma.letter.findUnique({
      where: { id: textId, userId },
    });

    if (!existingText) {
      throw new Error("Text not found");
    }

    // Delete the text
    await prisma.letter.delete({
      where: { id: textId, userId },
    });

    // Revalidate the dashboard page to show updated list
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting text:", error);
    throw new Error("Failed to delete text");
  }
}
