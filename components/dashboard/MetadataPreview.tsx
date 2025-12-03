"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PRESET_TAGS } from "@/lib/data";
import { Globe, Plus, X } from "lucide-react";

interface MetaPreview {
  title: string | null;
  description: string | null;
  image: string | null;
  tags: string[] | null;
  toggleTag: (t: string) => void;
  resetForm: () => void;
  save: () => void;
}

const MetadataPreview = ({
  title,
  description,
  image,
  save,
  tags,
  toggleTag,
  resetForm,
}: MetaPreview) => {
  const [expiresAt, setExpiresAt] = useState("");
  return (
    <div className="space-y-4 pt-4 border-t border-dashed animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-lg text-green-700 dark:text-green-400 flex items-center gap-2">
          <Globe className="h-5 w-5" /> Details Found!
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetForm}
          className="text-muted-foreground hover:text-destructive transition-colors"
        >
          <X className="h-4 w-4 mr-1" /> Clear
        </Button>
      </div>

      <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-2">
        <p className="text-sm font-medium">
          Title:{" "}
          <span className="font-normal">
            {title || "Untitled Link"}
          </span>
        </p>
        <p className="text-sm font-medium">
          Description:{" "}
          <span className="font-normal line-clamp-2">
            {description || "No description available."}
          </span>
        </p>
        {image && (
          <span className="text-xs text-muted-foreground">
            Image preview available.
          </span>
        )}
      </div>

      {/* Tag Selection */}
      <div className="flex flex-wrap gap-2 py-2 border-y">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
          Quick Tags:
        </span>
        {PRESET_TAGS.map((t) => (
          <button
            key={t}
            onClick={() => toggleTag(t)}
            className={`text-xs px-3 py-1 rounded-full border transition duration-150 ${
              tags?.includes(t)
                ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 shadow-md"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Save Section */}
      <div className="flex items-center gap-4 pt-2">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          Optional Deadline:
        </span>
        <Input
          type="date"
          className="w-auto p-2"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
        />
        <Button
          onClick={save}
          className="ml-auto bg-green-600 hover:bg-green-700 shadow-lg transition-transform duration-200 hover:scale-[1.02]"
          disabled={!title} // Ensure meta is valid before saving
        >
          <Plus className="h-4 w-4 mr-1" /> Finalize & Save
        </Button>
      </div>
    </div>
  );
};

export default MetadataPreview;
