"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SearchBar } from "@/components/shared/search-bar";
import { DeliveryBadge } from "@/components/shared/delivery-badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-radial">
      <Container className="grid min-h-[720px] items-center gap-10 py-12 md:grid-cols-[1.02fr_0.98fr] md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-bold text-foreground shadow-soft">
            <Sparkles className="h-4 w-4 text-accent" />
            Local groceries, beautifully simplified.
          </div>

          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-tight text-foreground md:text-7xl">
            Your neighborhood market, now online.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            Fresh groceries, deli favorites, pantry staples, snacks, drinks, and household essentials — ready for pickup or delivery in Troy.
          </p>

          <div className="mt-7 max-w-2xl rounded-[2rem] border border-border bg-card p-3 shadow-card">
            <SearchBar />
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <button className="focus-ring flex flex-1 items-center gap-2 rounded-full bg-muted px-4 py-3 text-left text-sm font-bold">
                <MapPin className="h-4 w-4 text-accent" />
                Enter your delivery address
              </button>
              <Button asChild variant="accent" size="lg">
                <Link href="/shop">
                  Shop Groceries
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <DeliveryBadge />
            <DeliveryBadge type="pickup" />
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-bold shadow-soft">
              <CheckCircle2 className="h-4 w-4 text-fresh" />
              Freshness guaranteed
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/deals">View Today’s Deals</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -right-8 top-8 hidden rounded-3xl bg-card p-4 shadow-card md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Next delivery</p>
                <p className="text-sm font-black">Today · 4:30–5:15 PM</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-4 shadow-card">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1400&auto=format&fit=crop"
                alt="Fresh groceries arranged in a market basket"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-card/90 p-4 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Fresh today</p>
                <p className="mt-1 text-2xl font-black tracking-tight">Produce, deli & pantry in one local basket.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
