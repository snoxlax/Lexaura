"use client";

import { cn, mapToLetterValues } from "@/lib/utils";
import { LetterValues } from "@/lib/validation";
import React, { useState } from "react";
import LetterForm from "./LetterForm";
import LetterPreview from "./LetterPreview";
import useAutoSaveLetter from "./useAutoSaveLetter";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { Letter } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { improveLetterText } from "./actions";
import { toast } from "@/hooks/use-toast";

interface LetterEditorProps {
  letterToEdit: Letter | null;
}

export default function LetterEditor({ letterToEdit }: LetterEditorProps) {
  const [letterData, setLetterData] = useState<LetterValues>(
    letterToEdit ? mapToLetterValues(letterToEdit) : {},
  );

  const { isSaving, hasUnsavedChanges } = useAutoSaveLetter(letterData);

  useUnloadWarning(hasUnsavedChanges);

  const [improvedText, setImprovedText] = useState<string>("");
  const [isImproving, setIsImproving] = useState(false);

  const handleImproveText = async () => {
    if (!letterData.content?.trim()) {
      toast({
        title: "No content to improve",
        description: "Please write some text before using AI improvement.",
        variant: "destructive",
      });
      return;
    }

    setIsImproving(true);
    try {
      const result = await improveLetterText(
        letterData.content,
        letterData.mood || "Professional",
      );
      setImprovedText(result.improvedContent);
      toast({
        title: "Text improved successfully!",
        description: "See the AI-enhanced version below.",
      });
    } catch {
      toast({
        title: "Failed to improve text",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsImproving(false);
    }
  };

  const handleUseImprovedText = () => {
    if (improvedText) {
      setLetterData((prev) => ({ ...prev, content: improvedText }));
      setImprovedText("");
      toast({
        title: "Improved text applied!",
        description: "The AI-enhanced version is now your main content.",
      });
    }
  };

  return (
    <div className="flex grow flex-col">
      <header className="flex items-center justify-between border-b px-4 py-5">
        <Button variant="outline" asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Text Editor</h1>
          <p className="text-muted-foreground text-sm">
            Write and organize your text.
          </p>
        </div>
        <div className="w-20"></div>
      </header>
      <main className="relative grow overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl space-y-8 p-6">
          <LetterForm
            letterData={letterData}
            setLetterData={setLetterData}
            isSaving={isSaving}
            onImproveText={handleImproveText}
            isImproving={isImproving}
          />
          <LetterPreview
            improvedText={improvedText}
            onUseImproved={handleUseImprovedText}
          />
        </div>
      </main>
      <footer className="w-full border-t px-2 py-4">
        <div className="flex flex-wrap justify-center gap-3 px-4">
          <div className="flex gap-3 px-4">
            <p
              className={cn(
                "text-muted-foreground transition-all duration-300",
                isSaving ? "opacity-100" : "opacity-0",
              )}
            >
              Saving...
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
