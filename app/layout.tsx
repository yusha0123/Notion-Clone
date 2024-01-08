import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your connected workspace for wiki, docs & projects | Notion",
  description: "Notion like website by Yusha Tahlil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("dark:bg-[#1F1F1F] dark:text-white", inter.className)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme-notion"
        >
          <ConvexClientProvider>
            <EdgeStoreProvider>
              {children}
              <ModalProvider />
              <Toaster position="bottom-center" />
            </EdgeStoreProvider>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
