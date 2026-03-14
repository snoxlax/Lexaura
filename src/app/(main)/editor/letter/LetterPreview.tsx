import { cn } from "@/lib/utils";
import { CopyIcon, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface LetterPreviewProps {
  improvedText?: string;
  onUseImproved?: () => void;
  className?: string;
}

export default function LetterPreview({
  improvedText,
  onUseImproved,
  className,
}: LetterPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!improvedText) return;
    navigator.clipboard.writeText(improvedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    });
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
        Results
      </p>
      {improvedText ? (
        <div className="group relative rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
              Improved text
            </span>
            <div className="flex items-center gap-2">
              {onUseImproved && (
                <button
                  onClick={onUseImproved}
                  className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <span className="flex items-center gap-1.5">
                    <Check className="size-4" aria-hidden />
                    Use this text
                  </span>
                </button>
              )}
              <button
                onClick={handleCopy}
                className="rounded-md bg-secondary p-1.5 text-muted-foreground transition-opacity hover:bg-muted hover:text-foreground opacity-100 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <Check className="size-4 text-primary" aria-hidden />
                ) : (
                  <CopyIcon className="size-4" aria-hidden />
                )}
              </button>
            </div>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {improvedText}
          </p>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Click &quot;Improve with AI&quot; to see results here
        </div>
      )}
    </div>
  );
}
