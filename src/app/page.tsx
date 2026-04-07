import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { JetBrains_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo3svg.svg";
import {
  Bookmark,
  GitCommitHorizontal,
  Mail,
  SpellCheck,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const btnPrimary =
  "rounded-none bg-neutral-100 px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm hover:bg-white";
const btnGhostOutline =
  "rounded-none border border-dashed border-neutral-600 bg-transparent font-mono text-sm text-neutral-400 hover:bg-neutral-950";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black text-neutral-200 antialiased">
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/90 shadow-[0_1px_2px_rgba(0,0,0,0.4)] backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-white transition-opacity hover:opacity-90"
          >
            <Image
              src={logo}
              alt="Lexaura"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="text-xl font-bold tracking-tight">Lexaura</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-5">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="text-neutral-200" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button size="sm" className={cn(btnPrimary)} asChild>
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-4 pb-20 pt-16 text-center sm:pt-20">
          <h1 className="text-balance text-3xl font-medium leading-tight tracking-tight text-neutral-200 sm:text-4xl">
            Writing that feels{" "}
            <span className="font-semibold text-neutral-400">minimal</span>{" "}
            <span className={cn(mono.className, "text-xl font-normal text-neutral-500 sm:text-2xl")}>
              {"{ precise }"}
            </span>{" "}
            and calm
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-neutral-500">
            A distraction-free editor with live preview, autosave, and simple
            organization—so you stay in flow, not in menus.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button className={cn(btnPrimary, "h-auto min-h-10 px-5 py-2.5")} asChild>
              <Link href="/sign-up">Start writing</Link>
            </Button>
            <Button
              variant="outline"
              className={cn(btnGhostOutline, "h-auto min-h-10 px-5 py-2.5")}
              asChild
            >
              <Link href="/sign-in">$ sign-in</Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-neutral-800 bg-neutral-950/40">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-[26px]">
                Built for how you actually write
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
                Pick a mode, or blend them — your saved styles stay ready.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: GitCommitHorizontal,
                  title: "Commits & code",
                  body: "Conventional or casual — match your repo and team without sounding generic.",
                },
                {
                  icon: Mail,
                  title: "Letters & email",
                  body: "Long-form or quick replies — keep the tone that people recognize as you.",
                },
                {
                  icon: Bookmark,
                  title: "Saved styles",
                  body: "Saved voices persist — switch contexts without reinventing tone.",
                },
                {
                  icon: SpellCheck,
                  title: "Grammar & polish",
                  body: "Clean up mistakes and wording when you do not need a full style pass.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="border border-neutral-800 bg-black/40 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      className="mt-0.5 h-7 w-7 shrink-0 text-violet-400"
                      aria-hidden
                    />
                    <div className="space-y-2">
                      <h3 className="text-[17px] font-semibold tracking-tight text-white">
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed text-neutral-500">
                        {body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-800">
          <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-[22px]">
              Ready to write with confidence?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
              Keep your tone consistent across commits, correspondence, and
              drafts.
            </p>
            <Button
              className={cn(btnPrimary, "mt-8 h-auto min-h-10 px-5 py-2.5")}
              asChild
            >
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-800 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6">
          <p className="text-sm text-neutral-500">
            © Lexaura — writing that stays yours.
          </p>
        </div>
      </footer>
    </div>
  );
}
