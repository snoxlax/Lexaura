import { LetterValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import React from "react";
import { CopyIcon, Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface LetterPreviewProps {
  letterData: LetterValues;
  className?: string;
  improvedText?: string;
  showImproved?: boolean;
  onToggleView?: () => void;
  onUseImproved?: () => void;
}

export default function LetterPreview({
  letterData,
  className,
  improvedText,
  showImproved,
  onToggleView,
  onUseImproved,
}: LetterPreviewProps) {
  const displayContent =
    showImproved && improvedText ? improvedText : letterData.content;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayContent || "");
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    });
  };

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-2xl bg-white p-6 text-black shadow-md print:shadow-none",
        className,
      )}
    >
      {/* Control buttons */}
      <div className="absolute right-4 bottom-4 flex flex-col gap-2">
        <Button
          className="hover:bg-primary bg-muted border-primary h-10 w-10 border-2"
          onClick={handleCopy}
        >
          <CopyIcon className="size-4" aria-label="Copy to clipboard" />
        </Button>

        {improvedText && onToggleView && (
          <Button
            className="hover:bg-primary bg-muted border-primary h-10 w-10 border-2"
            onClick={onToggleView}
          >
            {showImproved ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        )}

        {showImproved && improvedText && onUseImproved && (
          <Button
            className="h-10 w-10 border-2 bg-green-500 text-white hover:bg-green-600"
            onClick={onUseImproved}
          >
            <Check className="size-4" aria-label="Use improved text" />
          </Button>
        )}
      </div>

      {/* Header showing current view */}
      {improvedText && (
        <div className="mb-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
            {showImproved ? "🤖 AI Improved Version" : "📝 Original Version"}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-4">
          {displayContent ? (
            <div className="leading-relaxed whitespace-pre-wrap">
              {displayContent}
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
