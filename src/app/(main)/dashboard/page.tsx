import { Button } from "@/components/ui/button";
import { PlusSquare, FileText } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import TextCard from "./TextCard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const savedTexts = await prisma.letter.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Texts</h1>
          <p className="text-muted-foreground">
            Manage and edit your saved texts
          </p>
        </div>
        <Button asChild className="flex gap-2">
          <Link href="/editor/letter">
            <PlusSquare className="size-4" />
            New Text
          </Link>
        </Button>
      </div>

      {savedTexts.length === 0 ? (
        <div className="py-12 text-center">
          <FileText className="text-muted-foreground/50 mx-auto mb-4 h-12 w-12" />
          <h3 className="mb-2 text-lg font-medium">No texts yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first text to get started with clean, organized writing
          </p>
          <Button asChild>
            <Link href="/editor/letter">
              <PlusSquare className="mr-2 size-4" />
              Create Your First Text
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedTexts.map((text) => (
            <TextCard key={text.id} text={text} />
          ))}
        </div>
      )}
    </main>
  );
}
