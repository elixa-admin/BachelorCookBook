import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The Ultimate Bachelor Cookbook — Dinner is on you.",
  description:
    "An intimate kitchen companion for the eligible man — date-night showstoppers, effortless hosting, and a dozen dishes worth mastering.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        {children}
        <footer className="mt-24 border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-taupe">
            <span>&ldquo;Dinner is on you.&rdquo; — The Ultimate Bachelor Cookbook</span>
            <nav className="flex gap-5">
              <Link className="transition hover:text-brandy" href="/">Home</Link>
              <Link className="transition hover:text-brandy" href="/solo">Solo</Link>
              <Link className="transition hover:text-brandy" href="/date">Date</Link>
              <Link className="transition hover:text-brandy" href="/host">Host</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
