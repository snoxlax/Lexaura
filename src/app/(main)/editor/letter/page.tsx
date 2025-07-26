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

  const letterToEdit = letterId
    ? await prisma.letter.findUnique({
        where: { id: letterId, userId },
      })
    : null;

  return <LetterEditor letterToEdit={letterToEdit} />;
}
