import {
  Bookmark,
  LayoutDashboard,
  Send,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";

export const HeroIllustration = () => (
  <div className="relative h-64 w-full md:h-96 md:w-auto p-4 flex items-center justify-center">
    {/* Abstract background blobs (Dark Blue/Teal) */}
    <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 opacity-10 rounded-full mix-blend-multiply filter blur-xl animation-delay-4000 animate-blob"></div>
    </div>

    {/* Simplified Device Mockups */}
    <div className="relative z-10 flex space-x-8">
      {/* Laptop */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 p-2 rounded-lg shadow-2xl ring-4 ring-primary/30 w-48 h-32 transform -rotate-6 translate-y-4">
        <div className="text-xs font-semibold text-center text-gray-500 dark:text-gray-400 mb-1">
          PocketNaija Dashboard
        </div>
        <div className="flex flex-wrap gap-1">
          {[Bookmark, Users, Send, LayoutDashboard].map((Icon, i) => (
            <Icon
              key={i}
              className={`h-4 w-4 text-white p-0.5 rounded ${
                i % 2 === 0 ? "bg-indigo-500" : "bg-green-500"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500">
            ...100s more links
          </span>
        </div>
      </div>

      {/* Mobile */}
      <div className="bg-white dark:bg-gray-800 p-1 rounded-xl shadow-2xl ring-4 ring-primary/30 w-20 h-40 flex flex-col items-center justify-center transform rotate-3 -translate-y-4">
        <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full absolute top-2"></div>
        <div className="text-[10px] font-bold text-gray-700 dark:text-gray-300">
          Quick Save
        </div>
        <Bookmark className="h-6 w-6 text-primary mt-2" />
        <div className="text-[8px] text-gray-500 mt-1">
          jamb.gov.ng
        </div>
      </div>
    </div>

    {/* Animated Links Flowing (Simplified) */}
    <Zap
      className="absolute top-10 left-16 text-yellow-400 h-5 w-5 animate-pulse"
      style={{ animationDelay: "0.5s" }}
    />
    <TrendingUp
      className="absolute bottom-5 right-10 text-pink-400 h-5 w-5 animate-pulse"
      style={{ animationDelay: "1.5s" }}
    />
  </div>
);
