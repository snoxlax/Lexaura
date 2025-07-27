import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LetterValues } from "./validation";
import { Letter } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToLetterValues(
  data: Letter | null | undefined,
): LetterValues {
  return {
    id: data?.id || undefined,
    subject: data?.subject || "",
    content: data?.content || "",
    mood: data?.mood || "",
  };
}
