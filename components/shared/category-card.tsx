"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.18 }}>
      <Link
        href={`/categories/${category.slug}`}
        className="focus-ring group block overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
      >
        <div className="relative h-40 overflow-hidden bg-muted">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
          <div className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur">
            {category.productCount} items
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-black tracking-tight">{category.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {category.description}
              </p>
            </div>
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
