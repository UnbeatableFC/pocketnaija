import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { authClient } from '@/lib/auth-client'
import { AuthProvider } from 'better-auth/react'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
title: 'PocketNaija',
  description: 'Bookmark manager for Nigerian students & builders'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background antialiased`}
      >
        <AuthProvider client={authClient}>
          <Header />
          <main className="max-w-4xl mx-auto p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
