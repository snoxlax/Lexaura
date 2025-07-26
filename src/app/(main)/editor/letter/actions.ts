"use server";

import { LetterDocumentValues, letterDocumentSchema } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function saveLetter(
  values: LetterDocumentValues & { id?: string },
) {
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
