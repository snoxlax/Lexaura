"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo3svg.svg";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/95 shadow-[0_1px_2px_rgba(0,0,0,0.4)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-zinc-50 transition-opacity hover:opacity-90"
        >
          <Image
            src={logo}
            alt="Lexaura"
            width={35}
            height={35}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="text-xl font-bold tracking-tight">Lexaura</span>
        </Link>

        <div className="flex items-center gap-3">
          {mounted ? (
            <>
              <ThemeToggle />
              <UserButton
                appearance={{
                  baseTheme: theme === "dark" ? dark : undefined,
                  elements: {
                    avatarBox: {
                      width: 35,
                      height: 35,
                    },
                  },
                }}
              />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9" aria-hidden />
              <div className="h-9 w-9 rounded-full bg-zinc-800" aria-hidden />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
