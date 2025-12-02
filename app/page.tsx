"use client"

import{ useEffect, useState } from "react";
import {
  Bookmark,
  LayoutDashboard,
  Send,
  Users,
  Lightbulb,
  Zap,
  ArrowRight,
  Menu,
  X,
  CheckCircle,
} from "lucide-react";
import { FeatureCard } from "@/components/general/FeatureCard";
import { HeroIllustration } from "@/components/general/HeroIllustration";
import { testimonials, trustLogos } from "@/lib/data";
import { TestimonialCard } from "@/components/general/TestimonialCard";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter transition-colors duration-500">
      {/* Nav Bar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a
            href="#"
            className="flex items-center text-2xl font-extrabold text-gray-900 dark:text-white"
          >
            <Bookmark className="w-6 h-6 text-primary-500 mr-2" />{" "}
            PocketNaija
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition"
            >
              Stories
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition"
            >
              Contact
            </a>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Zap className="w-5 h-5" />
              ) : (
                <Lightbulb className="w-5 h-5" />
              )}
            </button>

            <a href="/login">
              <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105">
                Dashboard
              </button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900 dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg pb-4 transition-all duration-300 ease-in-out">
            <nav className="flex flex-col items-center space-y-3 pt-4">
              <a
                href="#features"
                className="text-gray-700 dark:text-gray-200 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 dark:text-gray-200 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Stories
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-200 hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a href="/login" className="w-full text-center">
                <button className="w-3/4 bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-full mt-2">
                  Dashboard
                </button>
              </a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="mt-3 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
              >
                {darkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"}
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* 1. Hero Section */}
        <section className="bg-linear-to-br from-indigo-900 to-indigo-700 dark:from-gray-800 dark:to-gray-900 text-white py-16 md:py-24 overflow-hidden rounded-b-[40px] shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
                Organize Your Future.{" "}
                <span className="text-yellow-400 block">
                  One Link at a Time.
                </span>
              </h1>
              <p className="text-xl text-indigo-200 mb-8 max-w-lg mx-auto md:mx-0 animate-in fade-in slide-in-from-left-6 duration-700 delay-200">
                PocketNaija is the smart bookmark manager for Nigerian
                students, scholarship seekers, and entrepreneurs
                (builders).
              </p>
              <div className="flex justify-center md:justify-start space-x-4 animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
                <a href="/signup">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition transform hover:scale-105 duration-300 flex items-center">
                    Get Started for Free{" "}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </a>
                <a href="#features">
                  <button className="border border-indigo-400 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-600 transition duration-300">
                    Learn More
                  </button>
                </a>
              </div>
              <p className="mt-4 text-sm text-indigo-300">
                Trusted by thousands of students and pros across
                Nigeria.
              </p>
            </div>

            {/* Right Illustration/Animation */}
            <div className="order-1 md:order-2 flex justify-center animate-in fade-in slide-in-from-right-4 duration-700">
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* 2. Trust/Clientele Bar */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-6 tracking-wider">
              Integrated with Resources from:
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-75">
              {trustLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 grayscale hover:grayscale-0 transition duration-300"
                >
                  {logo.icon}
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Feature Section */}
        <section
          id="features"
          className="py-20 bg-gray-50 dark:bg-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                Features Built for the Nigerian Builder
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Stop losing important links. Start building your
                future.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={
                  <LayoutDashboard className="w-8 h-8 text-yellow-600" />
                }
                title="Smart Organization"
                description="Auto-tags, categories, and powerful search finally to find links instantly, whether it's JAMB registration or SME loan advice."
                color="border-yellow-500"
              />
              <FeatureCard
                icon={<Send className="w-8 h-8 text-green-600" />}
                title="Deadline Reminders"
                description="Never miss that crucial scholarship deadline or application date. Set expiration dates and get automated alerts."
                color="border-green-500"
              />
              <FeatureCard
                icon={<Users className="w-8 h-8 text-red-600" />}
                title="Share & Collaborate"
                description="Easily share curated resource lists with study groups, mentorship circles, and fellow builders instantly."
                color="border-red-500"
              />
            </div>
          </div>
        </section>

        {/* 4. Testimonial & Footer CTA Section */}
        <section
          id="testimonials"
          className="py-20 bg-gray-900 dark:bg-black text-white rounded-t-[40px] shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* CTA Column */}
              <div className="lg:col-span-1 space-y-6 p-6 lg:p-0">
                <h2 className="text-4xl font-extrabold tracking-tight">
                  Ready to Get Organized?
                </h2>
                <p className="text-indigo-300 text-lg">
                  Join thousands of Nigerians building their future,
                  one organized link at a time.
                </p>
                <a href="/signup">
                  <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105 duration-300 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" /> Get
                    Started Now
                  </button>
                </a>
              </div>

              {/* Testimonials Grid */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                  <TestimonialCard
                    key={index}
                    quote={t.quote}
                    name={t.name}
                    title={t.title}
                    avatarUrl={t.avatarUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 PocketNaija. All rights reserved.
          </p>
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition"
            >
              Contact
            </a>
          </nav>
        </div>
      </footer>

      {/* Global Tailwind Styles (required for blob animation) */}
      <style jsx global>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 30px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;
