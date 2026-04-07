"use client";

import { Letter } from "@prisma/client";
import { CopyIcon, Check, BookOpen, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteText } from "@/app/(main)/dashboard/actions";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SavedTextCardProps {
  letter: Letter;
  moodId: string;
}

export default function SavedTextCard({ letter, moodId }: SavedTextCardProps) {
  const [copied, setCopied] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(letter.content || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = () => {
    setShowDialog(false);
    startTransition(async () => {
      try {
        await deleteText(letter.id);
        toast({ title: "Text deleted" });
      } catch {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete. Please try again.",
        });
      }
    });
  };

  return (
    <>
      <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {letter.styleTag && (
              <span className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
                {letter.styleTag}
              </span>
            )}
            <span className="text-xs text-zinc-500">
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(letter.updatedAt))}
            </span>
          </div>
          <div className="flex items-center gap-1.5 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
            <Link
              href={`/editor/${moodId}?letterId=${letter.id}`}
              className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              aria-label="Load this text"
            >
              <BookOpen className="size-4" />
            </Link>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <Check className="size-4 text-violet-400" />
              ) : (
                <CopyIcon className="size-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowDialog(true)}
              disabled={isPending}
              className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-red-950/50 hover:text-red-400"
              aria-label="Delete"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
        <p className="line-clamp-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
          {letter.content || "No content"}
        </p>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Text</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this text? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
