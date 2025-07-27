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
import { letterDocumentSchema, LetterValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LetterFormProps {
  letterData: LetterValues;
  setLetterData: React.Dispatch<React.SetStateAction<LetterValues>>;
  isSaving: boolean;
  onImproveText: () => Promise<void>;
  isImproving: boolean;
}

export default function LetterForm({
  letterData,
  setLetterData,
  onImproveText,
  isImproving,
}: LetterFormProps) {
  const form = useForm<LetterValues>({
    resolver: zodResolver(letterDocumentSchema),
    defaultValues: {
      subject: letterData.subject || "",
      content: letterData.content || "",
      mood: letterData.mood || "Professional",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      setLetterData((prev) => ({
        ...prev,
        subject: value.subject || "",
        content: value.content || "",
        mood: value.mood || "Professional",
      }));
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setLetterData]);

  return (
    <div className="">
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-2 space-x-2">
                <FormLabel className="">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter a title for your text..."
                    autoFocus
                    className="max-w-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem className="space-y-2 space-x-2">
                <FormLabel>Mood</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="justify-between">
                        {field.value
                          ? field.value
                          : "Select a mood for your text"}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuItem
                        onSelect={() => field.onChange("Professional")}
                      >
                        Professional
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => field.onChange("Casual")}
                      >
                        Casual
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => field.onChange("Formal")}
                      >
                        Formal
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => field.onChange("Friendly")}
                      >
                        Friendly
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => field.onChange("Serious")}
                      >
                        Serious
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => field.onChange("Creative")}
                      >
                        Creative
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => field.onChange("Motivational")}
                      >
                        Motivational
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => field.onChange("Humorous")}
                      >
                        Humorous
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={onImproveText}
              disabled={isImproving || !letterData.content?.trim()}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {isImproving ? "Improving..." : "Improve with AI"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
