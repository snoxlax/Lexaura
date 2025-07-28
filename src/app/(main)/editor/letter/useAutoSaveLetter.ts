import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { LetterValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { saveLetter } from "./actions";
import { fileReplacer } from "@/lib/utils";

export default function useAutoSaveLetter(letterData: LetterValues) {
  const searchParams = useSearchParams();

  const { toast } = useToast();

  const debouncedLetterData = useDebounce(letterData, 3000);

  const [letterId, setLetterId] = useState(letterData.id);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(letterData),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  // Use refs to prevent race conditions
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentSavePromiseRef = useRef<Promise<any> | null>(null);

  useEffect(() => {
    setIsError(false);
  }, [debouncedLetterData]);

  useEffect(() => {
    async function save() {
      // Prevent concurrent saves
      if (currentSavePromiseRef.current) {
        console.log("Save already in progress, skipping...");
        return;
      }

      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedLetterData);

        console.log("Attempting to save letter with data:", newData);

        const savePromise = saveLetter({
          ...newData,
          id: letterId,
        });

        currentSavePromiseRef.current = savePromise;
        const updatedLetter = await savePromise;

        console.log("Letter saved successfully:", updatedLetter);

        setLetterId(updatedLetter.id);
        setLastSavedData(newData);

        // Update URL only if we're not already on the correct letterId
        // and do it without triggering re-renders by checking current params
        const currentLetterId = searchParams.get("letterId");
        if (currentLetterId !== updatedLetter.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("letterId", updatedLetter.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsError(true);
        console.error("Save error:", error);
        const { dismiss } = toast({
          variant: "destructive",
          description: React.createElement("div", { className: "space-y-3" }, [
            React.createElement("p", null, "Could not save letter."),
            React.createElement(
              Button,
              {
                variant: "secondary",
                onClick: () => {
                  dismiss();
                  // Clear the current save promise before retrying
                  currentSavePromiseRef.current = null;
                  save();
                },
              },
              "Retry",
            ),
          ]),
        });
      } finally {
        setIsSaving(false);
        currentSavePromiseRef.current = null;
      }
    }

    console.log(
      "debouncedLetterData",
      JSON.stringify(debouncedLetterData, fileReplacer),
    );
    console.log("lastSavedData", JSON.stringify(lastSavedData, fileReplacer));

    const hasUnsavedChanges =
      JSON.stringify(debouncedLetterData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (hasUnsavedChanges && debouncedLetterData && !isSaving && !isError) {
      console.log("Scheduling save letter");

      // Clear any existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Add a small delay to batch rapid changes
      saveTimeoutRef.current = setTimeout(() => {
        save();
      }, 100);
    }

    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
    };
  }, [
    debouncedLetterData,
    isSaving,
    lastSavedData,
    isError,
    letterId,
    toast,
    // Removed searchParams from dependencies to prevent infinite loop
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(letterData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer),
  };
}
