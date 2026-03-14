"use client";

import { cn, mapToLetterValues } from "@/lib/utils";
import { LetterValues } from "@/lib/validation";
import React, { useState } from "react";
import LetterPreview from "./LetterPreview";
import useAutoSaveLetter from "./useAutoSaveLetter";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { Letter } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { improveLetterText } from "./actions";
import { toast } from "@/hooks/use-toast";
import SavedTextCard from "./SavedTextCard";

const moods = [
  "Professional",
  "Casual",
  "Formal",
  "Friendly",
  "Serious",
  "Creative",
  "Motivational",
  "Humorous",
];

interface LetterEditorProps {
  letterToEdit: Letter | null;
  savedLetters: Letter[];
}

export default function LetterEditor({
  letterToEdit,
  savedLetters,
}: LetterEditorProps) {
  const [letterData, setLetterData] = useState<LetterValues>(
    letterToEdit ? mapToLetterValues(letterToEdit) : {},
  );

  const { isSaving, hasUnsavedChanges } = useAutoSaveLetter(letterData);
  useUnloadWarning(hasUnsavedChanges);

  const [improvedHistory, setImprovedHistory] = useState<
    Array<{ id: number; text: string }>
  >([]);
  const [isImproving, setIsImproving] = useState(false);

  const handleRewrite = async () => {
    if (!letterData.content?.trim() || !letterData.mood) return;
    setIsImproving(true);
    try {
      const result = await improveLetterText(
        letterData.content,
        letterData.mood,
      );
      setImprovedHistory((prev) => [
        { id: Date.now(), text: result.improvedContent },
        ...prev,
      ]);
      toast({ title: "Text rewritten successfully!" });
    } catch {
      toast({
        title: "Failed to rewrite text",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsImproving(false);
    }
  };

  const handleUseResult = (text: string) => {
    setLetterData((prev) => ({ ...prev, content: text }));
    setImprovedHistory([]);
    toast({
      title: "Text applied!",
      description: "Your content has been updated and will auto-save.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="space-y-1 text-center">
            <h1 className="text-foreground text-3xl font-bold tracking-tight">
              Text<span className="text-primary">Rewriter</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Rewrite any text in the mood you choose
            </p>
          </div>
          <div className="w-20" />
        </div>

        <textarea
          value={letterData.content || ""}
          onChange={(e) =>
            setLetterData((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="Type or paste your text here..."
          className="border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-primary/40 h-36 w-full resize-none rounded-lg border p-4 text-sm transition-all focus:ring-2 focus:outline-none"
        />

        <div className="space-y-3">
          <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
            Choose a mood
          </p>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setLetterData((prev) => ({ ...prev, mood }))}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                  letterData.mood === mood
                    ? "bg-primary text-primary-foreground border-transparent shadow-lg"
                    : "bg-secondary text-secondary-foreground border-border hover:border-muted-foreground/30",
                )}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleRewrite}
          disabled={
            !letterData.content?.trim() || !letterData.mood || isImproving
          }
          className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Sparkles className="h-4 w-4" />
          {isImproving ? "Rewriting..." : "Rewrite"}
        </button>

        <LetterPreview
          improvedHistory={improvedHistory}
          onUseImproved={handleUseResult}
        />

        <p
          className={cn(
            "text-muted-foreground text-center text-sm transition-all duration-300",
            isSaving ? "opacity-100" : "opacity-0",
          )}
        >
          Saving...
        </p>

        {savedLetters.length > 0 && (
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              Your saved texts
            </p>
            <div className="space-y-3">
              {savedLetters.map((letter) => (
                <SavedTextCard key={letter.id} letter={letter} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
