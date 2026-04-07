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
    <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm leading-relaxed whitespace-pre-wrap text-zinc-100">
          {item.text}
        </p>
        <div className="flex shrink-0 items-center gap-1.5">
          {onUseImproved && (
            <button
              type="button"
              onClick={() => onUseImproved(item.text)}
              className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Use this text"
            >
              <ArrowDownToLine className="size-4" aria-hidden />
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="size-4 text-violet-400" aria-hidden />
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
      <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
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
        <div className="flex min-h-[80px] flex-1 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-center text-sm text-zinc-500">
          Click &quot;Rewrite&quot; to see results here
        </div>
      )}
    </div>
  );
}
