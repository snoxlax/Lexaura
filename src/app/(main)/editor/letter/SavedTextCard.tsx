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

export default function SavedTextCard({ letter }: { letter: Letter }) {
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
      <div className="group border-border bg-card relative rounded-lg border p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {letter.mood && (
              <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
                {letter.mood}
              </span>
            )}
            <span className="text-muted-foreground text-xs">
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(letter.updatedAt))}
            </span>
          </div>
          <div className="flex items-center gap-1.5 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
            <Link
              href={`/editor/letter?letterId=${letter.id}`}
              className="bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1.5"
              aria-label="Load this text"
            >
              <BookOpen className="size-4" />
            </Link>
            <button
              onClick={handleCopy}
              className="bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1.5"
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <Check className="text-primary size-4" />
              ) : (
                <CopyIcon className="size-4" />
              )}
            </button>
            <button
              onClick={() => setShowDialog(true)}
              disabled={isPending}
              className="bg-secondary text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-md p-1.5"
              aria-label="Delete"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
        <p className="text-foreground line-clamp-3 whitespace-pre-wrap text-sm leading-relaxed">
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
