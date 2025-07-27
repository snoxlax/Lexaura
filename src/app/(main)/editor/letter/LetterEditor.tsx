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
import { FileUserIcon, PenLineIcon, ArrowLeft } from "lucide-react";
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

  const [showSmLetterPreview, setShowSmLetterPreview] = useState(false);
  const [improvedText, setImprovedText] = useState<string>("");
  const [isImproving, setIsImproving] = useState(false);
  const [showImproved, setShowImproved] = useState(false);

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
      setShowImproved(true);
      toast({
        title: "Text improved successfully!",
        description: "Check the preview to see the AI-enhanced version.",
      });
    } catch (error) {
      console.error("Error improving text:", error);
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
      setShowImproved(false);
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
            Write and organize your text with real-time preview.
          </p>
        </div>
        <div className="w-20"></div>
      </header>
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-6 md:block md:w-1/2",
              showSmLetterPreview && "hidden",
            )}
          >
            <LetterForm
              letterData={letterData}
              setLetterData={setLetterData}
              isSaving={isSaving}
              onImproveText={handleImproveText}
              isImproving={isImproving}
            />
          </div>
          <div className="grow md:border-r" />
          <div
            className={cn(
              "hidden w-1/2 md:flex md:w-1/2",
              showSmLetterPreview && "flex w-full",
            )}
          >
            <div className="bg-secondary flex w-full justify-center overflow-y-auto">
              <LetterPreview
                letterData={letterData}
                improvedText={improvedText}
                showImproved={showImproved}
                onToggleView={() => setShowImproved(!showImproved)}
                onUseImproved={handleUseImprovedText}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t px-2 py-4">
        <div className="flex flex-wrap justify-center gap-3 px-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSmLetterPreview(!showSmLetterPreview)}
            className="md:hidden"
            title={showSmLetterPreview ? "Show editor" : "Show preview"}
          >
            {showSmLetterPreview ? <PenLineIcon /> : <FileUserIcon />}
          </Button>
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
