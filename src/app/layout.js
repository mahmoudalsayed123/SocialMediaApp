"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "../app/_components/Sidebar";
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

export const metadata = {
  title: "social-team",
  description: "A social media platform with multiple features",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Providers>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <Sidebar />
                <main className="lg:col-span-2 pb-20 lg:pb-0">{children}</main>
              </div>
            </Providers>
          </body>
        </html>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
