"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { letterDocumentSchema, LetterDocumentValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";

interface LetterFormProps {
  letterData: LetterDocumentValues;
  setLetterData: React.Dispatch<React.SetStateAction<LetterDocumentValues>>;
  isSaving: boolean;
}

export default function LetterForm({
  letterData,
  setLetterData,
}: LetterFormProps) {
  const form = useForm<LetterDocumentValues>({
    resolver: zodResolver(letterDocumentSchema),
    defaultValues: {
      subject: letterData.subject || "",
      content: letterData.content || "",
    },
  });

  const { watch } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      setLetterData((prev) => ({
        ...prev,
        subject: value.subject || "",
        content: value.content || "",
      }));
    });
    return () => subscription.unsubscribe();
  }, [watch, setLetterData]);

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold">Text Editor</h2>
        <p className="text-muted-foreground text-sm">
          Write and edit your text content.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter a title for your text..."
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Start writing your text content here..."
                    className="min-h-[300px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
