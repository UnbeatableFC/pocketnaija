"use client";
import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";

// Import the authClient instance
import { authClient } from "@/lib/auth-client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CornerDownLeft, LinkIcon } from "lucide-react";
import BookmarkCard, {
  Bookmark,
} from "@/components/general/BookmarkCard";
import MetadataPreview from "@/components/dashboard/MetadataPreview";

// Define the API fetcher
const fetcher = (url: string) => axios.get(url).then((r) => r.data);

// Define the Metadata type for consistency
type Metadata = {
  title: string | null;
  description: string | null;
  image: string | null;
  favicon: string | null;
};

export default function Dashboard() {
  // 💡 CORRECTED HOOK USAGE
  const {
    data: session, // The session object (will be null if unauthenticated)
    isPending, // The loading state
  } = authClient.useSession();
  const router = useRouter();

  // SWR for fetching bookmarks
  const {
    data,
    mutate,
    isLoading,
    error: swrError,
  } = useSWR<Bookmark[]>(
    // 🔑 UPDATED: Check for the existence of the session object
    session ? "/api/bookmarks" : null,
    fetcher
  );
  const bookmarks: Bookmark[] = data || [];

  // State for the Bookmark creation form
  const [url, setUrl] = useState("");
  const [metaLoading, setMetaLoading] = useState(false);
  const [meta, setMeta] = useState<Metadata | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [expiresAt, setExpiresAt] = useState("");
  const urlInputRef = useRef<HTMLInputElement>(null); // Ref for input focus

  // --- Auth Redirect Effect ---
  useEffect(() => {
    // 🔑 UPDATED: Check if session is NOT pending and session data is null/undefined
    if (!isPending && !session) {
      toast.warning("You must be logged in to view the dashboard.", {
        duration: 3000,
      });
      router.push("/auth/login");
    }

    if (swrError) {
      toast.error(
        "Failed to load bookmarks. Please try refreshing.",
        { duration: 5000 }
      );
    }
  }, [session, isPending, router, swrError]);

  // --- Fetch Metadata Logic (Enhanced) ---
  async function fetchMeta(e?: React.FormEvent) {
    e?.preventDefault(); // Handle submission via Enter key
    if (!url) {
      toast.warning("Please enter a URL first.", { duration: 3000 });
      return;
    }

    setMetaLoading(true);
    try {
      // Basic URL formatting check before scraping
      const formattedUrl = url.startsWith("http")
        ? url
        : `https://${url}`;

      const res = await axios.post("/api/scrape", {
        url: formattedUrl,
      });
      setMeta(res.data);
      toast.success("Metadata fetched successfully!", {
        duration: 2000,
      });
    } catch {
      toast.warning(
        "Could not fetch metadata. Please review details manually.",
        { duration: 4000 }
      );
      setMeta({
        title: url,
        description: null,
        image: null,
        favicon: null,
      }); // Set minimal data
    } finally {
      setMetaLoading(false);
    }
  }

  // --- Save Bookmark Logic (Enhanced) ---
  async function save() {
    if (!url || !meta?.title) {
      toast.error("URL and Title cannot be empty.", {
        duration: 3000,
      });
      return;
    }

    try {
      const payload = {
        url,
        title: meta.title,
        description: meta.description,
        image: meta.image,
        favicon: meta.favicon,
        tags: tags,
        expiresAt: expiresAt || null,
      };

      await axios.post("/api/bookmarks", payload);

      // Reset form states
      setUrl("");
      setMeta(null);
      setTags([]);
      setExpiresAt("");

      mutate(); // Revalidate list immediately
      toast.success("Bookmark saved to PocketNaija! 🎉", {
        duration: 3000,
      });
    } catch (err: unknown) {
      let errorMessage =
        "Failed to save bookmark due to a server error.";

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.error || errorMessage;
      }

      toast.error(errorMessage, { duration: 5000 });
    }
  }

  // --- Tag Logic ---
  const toggleTag = (t: string) => {
    setTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const resetForm = () => {
    setUrl("");
    setMeta(null);
    setTags([]);
    setExpiresAt("");
    urlInputRef.current?.focus();
  };

  // 🔑 UPDATED: Use isPending for the main loading check
  if (isPending || !session) {
    return (
      <div className="text-center p-16 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />{" "}
        {isPending
          ? "Authenticating and loading session..."
          : "Redirecting to login..."}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <h2 className="text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
        PocketNaija Dashboard 🇳🇬
      </h2>

      {/* 1. Bookmark Form (Creation C in CRUD) */}
      <Card className="p-6 space-y-4 shadow-xl animate-in fade-in duration-500">
        <CardHeader className="p-0">
          <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
            <LinkIcon className="h-5 w-5" /> Save New Resource
          </h3>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          {/* URL Input & Fetch */}
          <form onSubmit={fetchMeta} className="flex gap-3">
            <Input
              ref={urlInputRef}
              className="flex-1 text-base p-6 transition-all focus:ring-2 focus:ring-primary/50"
              placeholder="Paste a full URL here (e.g., https://jamb.gov.ng)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={metaLoading || !!meta}
            />
            <Button
              type="submit"
              onClick={fetchMeta}
              disabled={metaLoading || !url || !!meta}
              className="shrink-0 transition-transform duration-200 hover:scale-[1.03]"
            >
              {metaLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CornerDownLeft className="h-4 w-4" />
              )}
              <span className="ml-2 hidden sm:inline">
                {metaLoading ? "Fetching..." : "Scrape Data"}
              </span>
            </Button>
          </form>

          {/* Metadata Preview & Customization (Conditional Display) */}
          {meta && (
            <MetadataPreview
              description={meta.description}
              image={meta.image}
              save={save}
              resetForm={resetForm}
              tags={tags}
              title={meta.title}
              toggleTag={(t) => toggleTag(t)}
            />
          )}
        </CardContent>
      </Card>

      {/* 2. Bookmark List (Read R in CRUD) */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">
          Your Saved Resources ({bookmarks.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-2 text-center py-12 text-primary">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              Saved Bookmarks Loading...
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="col-span-2 p-10 border-2 border-dashed border-gray-300 rounded-xl text-center text-muted-foreground bg-gray-50 animate-in fade-in duration-700">
              <LinkIcon className="h-6 w-6 mx-auto mb-3" />
              <p>You haven&apos;t saved any bookmarks yet.</p>
              <p className="text-sm">Paste your first link above!</p>
            </div>
          ) : (
            bookmarks.map((b: Bookmark) => (
              // The BookmarkCard handles U and D (Update/Delete) operations.
              <BookmarkCard
                key={b.id}
                bookmark={b}
                refresh={mutate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
