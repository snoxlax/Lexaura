"use client";

import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteText } from "./actions";
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

interface DeleteTextButtonProps {
  textId: string;
}

export default function DeleteTextButton({ textId }: DeleteTextButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const handleDelete = () => {
    setShowDialog(false);

    startTransition(async () => {
      try {
        await deleteText(textId);
        toast({
          title: "Text deleted",
          description: "Your text has been successfully deleted.",
        });
      } catch (error) {
        console.error("Error deleting text:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete text. Please try again.",
        });
      }
    });
  };

  return (
    <>
      <button
        className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDialog(true);
        }}
        disabled={isPending}
      >
        <Trash2 className="h-4 w-4" />
        {isPending ? "Deleting..." : "Delete"}
      </button>

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
