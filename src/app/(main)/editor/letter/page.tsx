import { Metadata } from "next";
import LetterEditor from "./LetterEditor";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

interface PageProps {
  searchParams: Promise<{ letterId?: string }>;
}

export const metadata: Metadata = {
  title: "Text Editor",
};

export default async function LetterPage({ searchParams }: PageProps) {
  const { letterId } = await searchParams;
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [letterToEdit, savedLetters] = await Promise.all([
    letterId
      ? prisma.letter.findUnique({ where: { id: letterId, userId } })
      : null,
    prisma.letter.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return (
    <LetterEditor letterToEdit={letterToEdit ?? null} savedLetters={savedLetters} />
  );
}
