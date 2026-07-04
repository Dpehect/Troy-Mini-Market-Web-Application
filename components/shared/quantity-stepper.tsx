"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuantityStepper({
  value,
  onDecrease,
  onIncrease,
  min = 0
}: {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
}) {
  return (
    <div className="inline-flex h-10 items-center rounded-full border border-border bg-card p-1 shadow-soft" aria-label="Quantity controls">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onDecrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="min-w-8 text-center text-sm font-bold">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
