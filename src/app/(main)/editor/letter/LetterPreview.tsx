import { cn } from "@/lib/utils";
import { CopyIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const handleCopy = () => {
    if (!improvedText) return;
    navigator.clipboard.writeText(improvedText);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    });
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-2xl flex-col p-6",
        className,
      )}
    >
      {improvedText ? (
        <div className="rounded-lg bg-zinc-900 p-4 text-white">
          <div className="mb-3 flex items-center justify-end gap-2">
            {onUseImproved && (
              <Button
                size="sm"
                variant="secondary"
                onClick={onUseImproved}
                className="gap-1.5"
              >
                <Check className="size-4" aria-label="Use this text" />
                Use this text
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="gap-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <CopyIcon className="size-4" aria-label="Copy to clipboard" />
              Copy
            </Button>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {improvedText}
          </pre>
        </div>
      ) : (
        <div className="text-muted-foreground flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 text-center text-sm">
          Click &quot;Improve with AI&quot; to see results here
        </div>
      )}
    </div>
  );
}
