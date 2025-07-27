import { LetterValues } from "./validation";
import { Dispatch, SetStateAction } from "react";

export interface LetterEditorFormProps {
  letterData: LetterValues;
  setLetterData: Dispatch<SetStateAction<LetterValues>>;
  isSaving?: boolean;
}
