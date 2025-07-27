import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const letterDocumentSchema = z.object({
  subject: optionalString,
  content: optionalString,
  mood: optionalString,
});

export type LetterValues = z.infer<typeof letterDocumentSchema> & {
  id?: string;
};
