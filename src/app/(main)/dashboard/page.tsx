import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { templates } from "@/data/templates";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="space-y-6">
        {templates.map((t) => (
          <Link
            key={t.id}
            href={t.href}
            className="group flex w-full items-start justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 text-left transition-colors duration-300 hover:border-violet-500/40"
          >
            <div className="min-w-0 space-y-3">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-zinc-50 transition-colors group-hover:text-violet-300">
                  {t.title}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {t.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span
                    key={`${t.id}-${tag.label}`}
                    className={cn(
                      "inline-flex items-center rounded-md px-3 py-1 text-xs font-medium backdrop-blur-sm",
                      tag.className,
                    )}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
            <ChevronRight
              className="mt-1 h-5 w-5 shrink-0 text-zinc-500 transition-colors group-hover:text-violet-400"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
