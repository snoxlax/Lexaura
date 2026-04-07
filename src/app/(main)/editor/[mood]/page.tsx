import { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { isMoodId, getMoodById } from "@/data/moods";
import LetterEditor from "../_components/LetterEditor";

interface PageProps {
  params: Promise<{ mood: string }>;
  searchParams: Promise<{ letterId?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mood } = await params;
  const config = getMoodById(mood);
  return { title: config?.title ?? "Editor" };
}

export default async function MoodEditorPage({
  params,
  searchParams,
}: PageProps) {
  const { mood } = await params;
  const { letterId } = await searchParams;

  if (!isMoodId(mood)) {
    notFound();
  }

  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const [letterToEdit, savedLetters] = await Promise.all([
    letterId
      ? prisma.letter.findUnique({
          where: { id: letterId, userId, mood },
        })
      : null,
    prisma.letter.findMany({
      where: { userId, mood },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return (
    <LetterEditor
      moodId={mood}
      letterToEdit={letterToEdit ?? null}
      savedLetters={savedLetters}
    />
  );
}
