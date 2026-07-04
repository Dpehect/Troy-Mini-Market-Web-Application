"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBar({
  placeholder = "Search milk, eggs, bread, snacks…",
  className
}: {
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={cn("focus-within:ring-ring flex h-12 items-center gap-3 rounded-full border border-border bg-card px-4 shadow-soft transition focus-within:ring-2", className)}>
      <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      <span className="sr-only">Search products</span>
      <input
        className="h-full w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
        placeholder={placeholder}
        type="search"
      />
    </label>
  );
}
