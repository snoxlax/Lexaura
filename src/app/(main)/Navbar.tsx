"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo3.png";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client side before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={35}
            height={35}
            className="rounded-full"
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
              <div className="h-9 w-9 rounded-full bg-muted" aria-hidden />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
