'use client'
import { useState } from 'react'
// Restored original external imports for Next.js, Auth, and local UI components
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { Button } from '../ui/button';

import { Bookmark, Loader2, Menu, X, LayoutDashboard, LogOut, UserPlus, LogIn } from 'lucide-react';

export default function Header() {
  // Using the original 'useSession' hook signature
  const {data: session , isPending} = authClient.useSession()
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Redirect to home after successful sign out
          window.location.href = '/'
        }
      }
    })
  }
  
  // Navigation items for both desktop and mobile
  const navItems = session ? [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, action: null },
  ] : [
    { name: 'Login', href: '/auth/login', icon: LogIn, action: null },
    { name: 'Register', href: '/auth/register', icon: UserPlus, action: null, isPrimary: true },
  ];

  return (
    <>
      {/* Main Header Bar */}
      {/* Uses dark: classes, assuming external layout handles dark mode */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Logo and Branding */}
          <Link 
            href="/" 
            className="flex items-center text-xl font-extrabold text-gray-900 dark:text-white transition-colors duration-200 hover:text-primary"
            onClick={() => setIsMenuOpen(false)} // Close menu if clicking logo
          >
            <Bookmark className="w-6 h-6 text-primary mr-2 transform rotate-6" /> PocketNaija
          </Link>

          {/* Desktop Navigation & Actions */}
          <nav className="hidden md:flex gap-4 items-center">
            
            {/* Loading State Skeleton */}
            {isPending && (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Authenticating...</span>
              </div>
            )}

            {/* Authenticated Links */}
            {session && (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors flex items-center gap-1"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Button 
                  onClick={handleLogout} 
                  className="h-9 px-4 text-sm shadow-md transition-transform duration-200 hover:scale-[1.02]" 
                  variant="destructive"
                >
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </Button>
              </>
            )}

            {/* Unauthenticated Links */}
            {!session && (
              <>
                <Link 
                  href="/auth/login" 
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Button asChild className="h-9 px-4 text-sm transition-transform duration-200 hover:scale-105">
                  <Link href="/auth/register" className="flex items-center gap-1">
                    <UserPlus className="w-4 h-4" /> Get Started
                  </Link>
                </Button>
              </>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            className="md:hidden p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden animate-in fade-in" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-64 max-w-full h-full bg-white dark:bg-gray-800 shadow-2xl p-6 animate-in slide-in-from-right-10 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end items-center mb-8">
              <Button 
                onClick={() => setIsMenuOpen(false)} 
                className="p-1 text-gray-700 dark:text-gray-300 hover:text-primary transition"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            {/* Loading/Error State Mobile */}
            {isPending && (
              <div className="flex items-center justify-center p-3 mb-6 bg-gray-100 dark:bg-gray-700 rounded-xl space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Authenticating...</span>
              </div>
            )}

            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition ${
                    item.isPrimary 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}

              {/* Mobile Logout Button (if authenticated) */}
              {session && (
                <Button 
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="w-full mt-6 h-10" 
                  variant="destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}