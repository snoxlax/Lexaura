import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo3.png";
import { CheckCircle, Zap, FileText, Sparkles } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="flex h-16 items-center border-b bg-white/80 px-4 backdrop-blur-sm lg:px-6 dark:bg-gray-900/80">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Lexaura Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-xl font-bold">Lexaura</span>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Write Better with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Clean & Simple
              </span>{" "}
              Text Editing
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
              Write with confidence using our distraction-free editor. Real-time
              preview, auto-save, and easy organization keep your writing
              focused and organized.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8 py-6 text-lg" asChild>
              <Link href="/sign-up">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Writing Better
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg"
              asChild
            >
              <Link href="/sign-in">
                <FileText className="mr-2 h-5 w-5" />
                Sign In
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto mt-24 grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 text-center shadow-sm dark:bg-gray-800">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Real-Time Preview</h3>
            <p className="text-muted-foreground">
              See your formatted text instantly as you type in a clean,
              side-by-side preview.
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 text-center shadow-sm dark:bg-gray-800">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Text Management</h3>
            <p className="text-muted-foreground">
              Organize all your texts in one place. Easy access to edit, copy,
              and delete your documents.
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 text-center shadow-sm dark:bg-gray-800">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Auto-Save</h3>
            <p className="text-muted-foreground">
              Never lose your work. Every change is automatically saved as you
              type.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 space-y-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to Write Better?</h2>
          <p className="mx-auto max-w-2xl text-xl text-blue-100">
            Join thousands of users who trust Lexaura for clean,
            distraction-free writing with powerful organization tools.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="px-8 py-6 text-lg"
            asChild
          >
            <Link href="/sign-up">Get Started for Free</Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Lexaura Logo"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="font-semibold">Lexaura</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 Lexaura. Clean text editing made simple.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
