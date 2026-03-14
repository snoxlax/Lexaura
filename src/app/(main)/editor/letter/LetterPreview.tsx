import { cn } from "@/lib/utils";
import { ArrowDownToLine, CopyIcon, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface HistoryItem {
  id: number;
  text: string;
}

interface LetterPreviewProps {
  improvedHistory?: HistoryItem[];
  onUseImproved?: (text: string) => void;
  className?: string;
}

function ResultCard({
  item,
  onUseImproved,
}: {
  item: HistoryItem;
  onUseImproved?: (text: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    });
  };

  return (
    <div className="group border-border bg-card relative rounded-lg border p-5">
      <div className="flex items-center justify-between">
        <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
          {item.text}
        </p>
        <div className="flex items-center gap-2">
          {onUseImproved && (
            <button
              onClick={() => onUseImproved(item.text)}
              className="bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1.5 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
              aria-label="Use this text"
            >
              <ArrowDownToLine className="size-4" aria-hidden />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1.5 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="text-primary size-4" aria-hidden />
            ) : (
              <CopyIcon className="size-4" aria-hidden />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LetterPreview({
  improvedHistory = [],
  onUseImproved,
  className,
}: LetterPreviewProps) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
        Results
      </p>
      {improvedHistory.length > 0 ? (
        <div className="space-y-3">
          {improvedHistory.map((item) => (
            <ResultCard
              key={item.id}
              item={item}
              onUseImproved={onUseImproved}
            />
          ))}
        </div>
      ) : (
        <div className="border-border text-muted-foreground flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 text-center text-sm">
          Click &quot;Improve with AI&quot; to see results here
        </div>
      )}
    </div>
  );
}
