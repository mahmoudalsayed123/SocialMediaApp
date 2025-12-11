"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import Sidebar from "./_components/Sidebar";
import Providers from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Providers>
              {/* ✔ صفحات المستخدم اللي داخل */}
              <SignedIn>
                <div className="grid md:grid-cols-[1.6fr_5fr]">
                  <Sidebar />
                  <main className="pb-0 lg:pb-0 overflow-hidden">
                    {children}
                  </main>
                </div>
              </SignedIn>

              {/* ✔ صفحة sign-in فقط */}
              <SignedOut>
                <main>{children}</main>
              </SignedOut>
            </Providers>
          </body>
        </html>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
