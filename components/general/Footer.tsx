"use client";

import Link from "next/link";
import {
  Bookmark,
  Twitter,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
} from "lucide-react";
import { LucideIcon } from 'lucide-react';
import { authClient } from "@/lib/auth-client";
import React from "react";

export default function Footer() {
  const { data: session } = authClient.useSession();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand + Description */}
          <div className="col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              <Bookmark className="w-7 h-7 text-primary-500 transform -rotate-6" />
              <span>PocketNaija</span>
            </Link>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pr-6">
              The smart way to manage bookmarks, stay organized, and sync your
              browsing life across devices — fast, clean and secure.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4">
              Product
            </h3>

            <ul className="space-y-3">
              <li>
                <FooterLink href="#features" label="Features" />
              </li>
              <li>
                <FooterLink href="#testimonials" label="Stories" />
              </li>
              <li>
                <FooterLink href="/pricing" label="Pricing" />
              </li>
              <li>
                <FooterLink href="/docs" label="Documentation" />
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4">
              Company
            </h3>

            <ul className="space-y-3">
              <li>
                <FooterLink href="/about" label="About Us" />
              </li>
              <li>
                <FooterLink href="/blog" label="Blog" />
              </li>
              <li>
                <FooterLink href="/contact" label="Contact" />
              </li>
              <li>
                <FooterLink href="/support" label="Support" />
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4">
              Account
            </h3>

            <ul className="space-y-3">
              {session ? (
                <>
                  <li>
                    <FooterLink href="/dashboard" label="Dashboard" />
                  </li>
                  <li>
                    <FooterLink href="/settings" label="Settings" />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <FooterLink href="/auth/login" label="Login" />
                  </li>
                  <li>
                    <FooterLink href="/auth/register" label="Create Account" />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-200 dark:border-gray-800" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">

          {/* Social Media */}
          <div className="flex items-center space-x-6">
            <SocialLink
              href="https://x.com/"
              icon={Twitter}
              label="Twitter"
            />
            <SocialLink
              href="https://github.com/"
              icon={Github}
              label="GitHub"
            />
            <SocialLink
              href="https://linkedin.com/"
              icon={Linkedin}
              label="LinkedIn"
            />
            <SocialLink href="mailto:wisdommpam99@gmail.com" icon={Mail} label="Email" />
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
            © {new Date().getFullYear()} WhizzDigics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Reusable link components */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary font-medium inline-flex items-center gap-1"
    >
      <ChevronRight className="w-3 h-3 opacity-70" /> {label}
    </Link>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition"
    >
      <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </Link>
  );
}
