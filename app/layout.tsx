import type { Metadata } from "next";
// Assuming you have imported and configured your fonts correctly
import { Geist, Geist_Mono } from "next/font/google"; 
import { authClient } from '@/lib/auth-client'


import "./globals.css";
// Adjusted import path for clarity and convention (using @/components/general)
import Header from "@/components/general/Header"; 
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils"; // Import cn utility for cleaner class merging
import Footer from "@/components/general/Footer";

// --- Font Configuration ---
// Note: Ensure these local imports are correctly set up or replace with standard Next fonts if Geist isn't configured.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Recommended for better font loading performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

// --- Metadata Configuration (SEO) ---
export const metadata: Metadata = {
  title: {
    default: 'PocketNaija | Bookmark Manager',
    template: '%s | PocketNaija', // Allows dynamic page titles (e.g., Dashboard | PocketNaija)
  },
  description: 'A dedicated bookmark manager designed for Nigerian students and builders to organize important resources, links, and scholarship opportunities.',
  keywords: ['bookmarks', 'Nigeria', 'students', 'builders', 'links', 'scholarship', 'resource manager'],
  authors: [{ name: 'PocketNaija Team' }],
  creator: 'PocketNaija Team',
  // Recommended open graph settings for social sharing
  openGraph: {
    title: 'PocketNaija | Bookmark Manager',
    description: 'A dedicated bookmark manager for Nigerian students and builders.',
    url: 'https://pocketnaija.com', // Replace with your actual domain
    siteName: 'PocketNaija',
    type: 'website',
  },
};

// --- Main Layout Component ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 1. Accessibility: Use suppressHydrationWarning for <html> tag
    <html lang="en" suppressHydrationWarning> 
      <body
        // 2. Styling: Use cn utility for cleaner class merging and ensure dark mode support
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.variable, 
          geistMono.variable
        )}
      >
        {/* 3. Authentication Provider */}
        
          <Header />
          
          {/* 4. Content Area: Increased width for modern screens and better content scaling */}
          <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            {children}
          </main>
          
          {/* 5. Toaster (Sonner) */}
          {/* We can add positioning props for better control */}
          <Footer />
          <Toaster position="top-right" richColors /> 
       
      </body>
    </html>
  );
}