import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const font = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Owl",
  description: "Minimal personal analytics",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={font.variable}>
      <body className="relative min-h-dvh bg-background-neutral-default font-sans text-foreground-neutral-default antialiased">
        {children}
      </body>
    </html>
  );
}
