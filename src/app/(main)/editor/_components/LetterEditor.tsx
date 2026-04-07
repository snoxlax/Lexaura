"use client";

import { cn, mapToLetterValues } from "@/lib/utils";
import { LetterValues } from "@/lib/validation";
import { useState } from "react";
import LetterPreview from "./LetterPreview";
import { Letter } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { improveLetterText, saveLetter } from "./actions";
import { toast } from "@/hooks/use-toast";
import SavedTextCard from "./SavedTextCard";
import { getMoodById } from "@/data/moods";
import type { MoodId } from "@/data/moods";

interface LetterEditorProps {
  moodId: MoodId;
  letterToEdit: Letter | null;
  savedLetters: Letter[];
}

export default function LetterEditor({
  moodId,
  letterToEdit,
  savedLetters,
}: LetterEditorProps) {
  const router = useRouter();
  const moodConfig = getMoodById(moodId)!;

  const [letterData, setLetterData] = useState<LetterValues>(
    letterToEdit ? mapToLetterValues(letterToEdit) : { mood: moodId },
  );

  /** Latest AI output only; input textarea always keeps the user's original text. */
  const [currentResult, setCurrentResult] = useState<string | null>(null);
  const [isImproving, setIsImproving] = useState(false);

  const handleRewrite = async () => {
    if (!letterData.content?.trim() || !letterData.styleTag) return;
    setIsImproving(true);
    try {
      const result = await improveLetterText(
        letterData.content,
        moodId,
        letterData.styleTag,
      );

      // Always create a new row so "Your saved texts" keeps full history for this mood.
      const saved = await saveLetter({
        content: result.improvedContent,
        mood: moodId,
        styleTag: letterData.styleTag,
        subject: letterData.subject ?? "",
      });

      setLetterData((prev) => ({
        ...prev,
        id: saved.id,
        mood: moodId,
      }));

      setCurrentResult(result.improvedContent);

      router.replace(`/editor/${moodId}?letterId=${saved.id}`);
      router.refresh();

      toast({ title: "Text rewritten and saved!" });
    } catch {
      toast({
        title: "Failed to rewrite or save",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
              {moodConfig.title}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {moodConfig.description}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="letter-input"
            className="text-xs font-medium tracking-wider text-zinc-500 uppercase"
          >
            Input
          </label>
          <textarea
            id="letter-input"
            value={letterData.content || ""}
            onChange={(e) => {
              setLetterData((prev) => ({
                ...prev,
                content: e.target.value,
              }));
              setCurrentResult(null);
            }}
            placeholder="Type or paste your text here..."
            className="border-zinc-700 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/40 focus:ring-violet-500/20 min-h-[130px] w-full resize-y rounded-xl border p-4 text-sm leading-relaxed transition-all focus:ring-2 focus:outline-none"
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
            Choose a style
          </p>
          <div className="flex flex-wrap gap-2">
            {moodConfig.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setLetterData((prev) => ({ ...prev, styleTag: tag }));
                  setCurrentResult(null);
                }}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                  letterData.styleTag === tag
                    ? "border-transparent bg-violet-600 text-white shadow-lg shadow-violet-900/40"
                    : "border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:border-zinc-600",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleRewrite}
          disabled={
            !letterData.content?.trim() || !letterData.styleTag || isImproving
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_-4px_rgba(139,92,246,0.55)] transition hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Sparkles className="h-4 w-4" aria-hidden />
          {isImproving ? "Rewriting\u2026" : "Rewrite"}
        </button>

        <LetterPreview
          improvedHistory={
            currentResult
              ? [{ id: 0, text: currentResult }]
              : []
          }
        />

        {savedLetters.length > 0 && (
          <div className="space-y-3 border-t border-zinc-800 pt-6">
            <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
              Your saved texts
            </p>
            <div className="space-y-3">
              {savedLetters.map((letter) => (
                <SavedTextCard
                  key={letter.id}
                  letter={letter}
                  moodId={moodId}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
