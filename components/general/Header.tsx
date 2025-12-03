"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  Bookmark,
  Loader2,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  UserPlus,
  LogIn,
  Lightbulb,
  Zap,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

type NavItem = {
  name: string;
  href: string;
  icon?: LucideIcon;
  isPrimary?: boolean;
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const showMarketingLinks = pathname === "/";

  // BetterAuth hook (client)
  const { data: session, isPending } = authClient.useSession();

  // Mobile drawer state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // UX loading guard for logout/login operations
  const [actionLoading, setActionLoading] = useState(false);

  // Dark mode (persisted)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("pn:dark");
      if (saved != null) return saved === "1";
      // default by OS preference
      return (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("pn:dark", darkMode ? "1" : "0");
      if (darkMode) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } catch {
      /* ignore storage errors */
    }
  }, [darkMode]);

  // Navigation items (marketing + auth-aware)
  const marketingItems: NavItem[] = showMarketingLinks
    ? [
        { name: "Features", href: "#features" },
        { name: "Stories", href: "#testimonials" },
        { name: "Contact", href: "#" },
      ]
    : [];

  const authItems: NavItem[] = session
    ? [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ]
    : [
        { name: "Login", href: "/auth/login", icon: LogIn },
        {
          name: "Register",
          href: "/auth/register",
          icon: UserPlus,
          isPrimary: true,
        },
      ];
  const combinedNav = [...marketingItems, ...authItems];

  // Logout handler with toasts
  async function handleLogout() {
    if (actionLoading) return;
    setActionLoading(true);

    try {
      await authClient.signOut(
        {},
        {
          onRequest: () => {
            toast.loading("Signing out...", { id: "signout-toast" });
          },
          onSuccess: () => {
            toast.success("Signed out", { id: "signout-toast" });
            // a hard redirect ensures cookies/session cleared
            window.location.href = "/";
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message || "Could not sign out", {
              id: "signout-toast",
            });
          },
        }
      );
    } catch {
      toast.error("Network error while signing out", {
        id: "signout-toast",
      });
    } finally {
      setActionLoading(false);
    }
  }

  // Small helper to handle sign-in nav actions (keeps UX consistent)
  function goTo(href: string) {
    setIsMenuOpen(false);
    router.push(href);
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-extrabold text-gray-900 dark:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-label="PocketNaija home"
              >
                <Bookmark className="w-7 h-7 text-primary-500 transform -rotate-6" />
                <span className="hidden sm:inline">PocketNaija</span>
              </Link>
            </div>

            {/* Center: Desktop navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {/* Marketing links */}
              {marketingItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode((v) => !v)}
                className="hidden sm:inline-flex p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
                aria-label={
                  darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                title={
                  darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {darkMode ? (
                  <Zap className="w-5 h-5" />
                ) : (
                  <Lightbulb className="w-5 h-5" />
                )}
              </button>

              {/* Auth status / CTAs (desktop) */}
              <div className="hidden md:flex items-center gap-3">
                {isPending && (
                  <div className="flex items-center gap-2 px-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Authenticating...
                    </span>
                  </div>
                )}

                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <LayoutDashboard className="w-4 h-4" />{" "}
                      Dashboard
                    </Link>

                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="h-9 px-3 text-sm inline-flex items-center gap-2"
                      disabled={actionLoading}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition"
                    >
                      Login
                    </Link>

                    <Button
                      onClick={() => router.push("/auth/register")}
                      className="h-9 px-3 text-sm"
                    >
                      <UserPlus className="w-4 h-4" /> Get Started
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile menu toggle */}
              <div className="md:hidden">
                <Button
                  onClick={() => setIsMenuOpen((s) => !s)}
                  className="p-2 rounded-md"
                  aria-label="Open menu"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer + Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          aria-hidden={false}
          role="dialog"
          aria-modal="true"
        >
          {/* overlay */}
          <button
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          />

          {/* panel */}
          <aside
            className="absolute right-0 top-0 w-80 max-w-full h-full bg-white dark:bg-gray-900 shadow-2xl p-6 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bookmark className="w-6 h-6 text-primary-500 transform -rotate-6" />{" "}
                PocketNaija
              </Link>

              <Button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close"
                className="p-1"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Auth loading state */}
            {isPending && (
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Authenticating
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Checking session…
                  </div>
                </div>
              </div>
            )}

            {/* Links */}
            <nav className="flex flex-col gap-3">
              {combinedNav.map((item) => {
                const isPrimary = item.isPrimary;
                return (
                  <button
                    key={item.name}
                    onClick={() => goTo(item.href)}
                    className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg font-semibold transition ${
                      isPrimary
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    {item.name}
                  </button>
                );
              })}

              <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                {/* Dark mode in mobile */}
                <button
                  onClick={() => setDarkMode((v) => !v)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <div className="flex items-center gap-3">
                    {darkMode ? (
                      <Zap className="w-5 h-5" />
                    ) : (
                      <Lightbulb className="w-5 h-5" />
                    )}
                    <span className="font-medium">Appearance</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {darkMode ? "Dark" : "Light"}
                  </span>
                </button>

                {/* Auth actions mobile */}
                <div className="mt-4">
                  {session ? (
                    <Button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      variant="destructive"
                      className="w-full h-10"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          setIsMenuOpen(false);
                          router.push("/auth/login");
                        }}
                        className="w-full h-10 mb-3"
                      >
                        <LogIn className="w-4 h-4 mr-2" /> Login
                      </Button>

                      <Button
                        onClick={() => {
                          setIsMenuOpen(false);
                          router.push("/auth/register");
                        }}
                        className="w-full h-10"
                      >
                        <UserPlus className="w-4 h-4 mr-2" /> Get
                        Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
