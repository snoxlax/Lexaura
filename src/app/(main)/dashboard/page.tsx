import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Text<span className="text-primary">Rewriter</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed">
            Paste your text, pick a mood, and let AI remove grammar mistakes and
            rewrite it in the tone you choose.
          </p>
        </div>
        <Button size="lg" asChild className="w-full sm:w-auto">
          <Link href="/editor/letter" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Start Rewriting
          </Link>
        </Button>
      </div>
    </main>
  );
}
