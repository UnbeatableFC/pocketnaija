import { Bookmark, LayoutDashboard, Lightbulb, TrendingUp, Zap } from "lucide-react";

// Dummy data for testimonials
export const testimonials = [
  {
    quote:
      "PocketNaija changed how I study! Hundreds of links used to overwhelm me. This tool is a lifesaver!",
    name: "Aisha T.",
    title: "Software Engineer",
    avatarUrl: "https://placehold.co/40x40/10B981/FFFFFF?text=AT",
  },
  {
    quote:
      "As a developer, bookmarking hundreds of links a month is easy. PocketNaija helps me categorize and recall them quickly.",
    name: "Seun O.",
    title: "Data Analyst",
    avatarUrl: "https://placehold.co/40x40/EF4444/FFFFFF?text=SO",
  },
  {
    quote:
      "Found three scholarships thanks to the deadline reminders. Essential tool for every Nigerian student and builder.",
    name: "Chijioke E.",
    title: "Business Student",
    avatarUrl: "https://placehold.co/40x40/FBBF24/FFFFFF?text=CE",
  },
];

// Placeholder logos/Trust Bar data
export const trustLogos = [
  {
    name: "University",
    icon: (
      <Lightbulb className="w-6 h-6 text-gray-500 dark:text-gray-400" />
    ),
  },
  {
    name: "Education Hub",
    icon: (
      <LayoutDashboard className="w-6 h-6 text-gray-500 dark:text-gray-400" />
    ),
  },
  {
    name: "Govt Portal",
    icon: (
      <Bookmark className="w-6 h-6 text-gray-500 dark:text-gray-400" />
    ),
  },
  {
    name: "SME Loan",
    icon: (
      <TrendingUp className="w-6 h-6 text-gray-500 dark:text-gray-400" />
    ),
  },
  {
    name: "Tech Pro",
    icon: (
      <Zap className="w-6 h-6 text-gray-500 dark:text-gray-400" />
    ),
  },
];
