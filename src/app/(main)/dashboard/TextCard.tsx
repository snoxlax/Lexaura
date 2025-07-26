"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteTextButton from "./DeleteTextButton";
import Link from "next/link";

interface TextCardProps {
  text: {
    id: string;
    subject: string | null;
    content: string | null;
    updatedAt: Date;
  };
}

export default function TextCard({ text }: TextCardProps) {
  return (
    <Card className="relative cursor-pointer transition-shadow hover:shadow-md">
      <Link href={`/editor/letter?letterId=${text.id}`} className="block">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <CardTitle className="line-clamp-1 text-lg">
                {text.subject || "Untitled Text"}
              </CardTitle>
              <div className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                <Calendar className="size-3" />
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(text.updatedAt))}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <DeleteTextButton textId={text.id} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {text.content || "No content yet..."}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
