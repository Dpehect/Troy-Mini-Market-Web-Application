"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster({
  ...props
}: React.ComponentProps<typeof Sonner>) {
  return (
    <Sonner
      toastOptions={{
        classNames: {
          toast:
            "border border-border bg-card text-foreground shadow-card",
          title: "font-semibold",
          description: "text-muted-foreground"
        }
      }}
      {...props}
    />
  );
}
