"use client";

import { cn } from "@/lib/utils";
import { LetterDocumentValues } from "@/lib/validation";
import React, { useState } from "react";
import LetterForm from "./LetterForm";
import LetterPreview from "./LetterPreview";
import useAutoSaveLetter from "./useAutoSaveLetter";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { Letter } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileUserIcon, PenLineIcon } from "lucide-react";

interface LetterEditorProps {
  letterToEdit?: Letter | null;
}

export default function LetterEditor({ letterToEdit }: LetterEditorProps) {
  const [letterData, setLetterData] = useState<
    LetterDocumentValues & { id?: string }
  >({
    id: letterToEdit?.id || undefined,
    subject: letterToEdit?.subject || "",
    content: letterToEdit?.content || "",
  });

  const { isSaving, hasUnsavedChanges } = useAutoSaveLetter(letterData);

  useUnloadWarning(hasUnsavedChanges);

  const [showSmLetterPreview, setShowSmLetterPreview] = useState(false);

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center"></header>
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
            />
          </div>
          <div className="grow md:border-r" />
          <div
            className={cn(
              "hidden w-1/2 md:flex md:w-1/2",
              showSmLetterPreview && "flex w-full",
            )}
          >
            <div className="bg-secondary flex w-full justify-center overflow-y-auto p-6">
              <LetterPreview letterData={letterData} />
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t px-3 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSmLetterPreview(!showSmLetterPreview)}
            className="md:hidden"
            title={showSmLetterPreview ? "Show editor" : "Show preview"}
          >
            {showSmLetterPreview ? <PenLineIcon /> : <FileUserIcon />}
          </Button>
          <div className="flex items-center gap-3">
            <p
              className={cn(
                "text-muted-foreground transition-all duration-300",
                isSaving ? "opacity-100" : "opacity-0",
              )}
            >
              Saving...
            </p>
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Close</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
