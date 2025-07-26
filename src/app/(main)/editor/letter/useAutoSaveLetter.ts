import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { LetterDocumentValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { saveLetter } from "./actions";
import { fileReplacer } from "@/lib/utils";

export default function useAutoSaveLetter(
  letterData: LetterDocumentValues & { id?: string },
) {
  const searchParams = useSearchParams();

  const { toast } = useToast();

  const debouncedLetterData = useDebounce(letterData, 2000);

  const [letterId, setLetterId] = useState(letterData.id);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(letterData),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedLetterData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedLetterData);

        console.log("Attempting to save letter with data:", newData);

        const updatedLetter = await saveLetter({
          ...newData,
          id: letterId,
        });

        console.log("Letter saved successfully:", updatedLetter);

        setLetterId(updatedLetter.id);
        setLastSavedData(newData);

        if (searchParams.get("letterId") !== updatedLetter.id) {
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
        console.error(error);
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
                  save();
                },
              },
              "Retry",
            ),
          ]),
        });
      } finally {
        setIsSaving(false);
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
      console.log("save letter");
      save();
    }
  }, [
    debouncedLetterData,
    isSaving,
    lastSavedData,
    isError,
    letterId,
    searchParams,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(letterData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer),
  };
}
