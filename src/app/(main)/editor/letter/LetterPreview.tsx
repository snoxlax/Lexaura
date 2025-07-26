import { LetterDocumentValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import React from "react";

interface LetterPreviewProps {
  letterData: LetterDocumentValues;
  className?: string;
}

export default function LetterPreview({
  letterData,
  className,
}: LetterPreviewProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-2xl bg-white p-6 text-black shadow-md print:shadow-none",
        className,
      )}
    >
      <div className="space-y-6">
        <div className="pb-4">
          {letterData.subject ? (
            <div className="space-y-2">
              <h1 className="text-xl font-bold">{letterData.subject}</h1>
            </div>
          ) : (
            <div className="text-muted-foreground text-sm italic">
              Enter a title above to see it here
            </div>
          )}
        </div>

        <div className="space-y-4">
          {letterData.content ? (
            <div className="leading-relaxed whitespace-pre-wrap">
              {letterData.content}
            </div>
          ) : (
            <div className="text-muted-foreground text-sm italic">
              Start writing your content to see the preview...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
