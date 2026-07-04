export const dynamic = "force-dynamic";

import { Container } from "@/components/shared/container";

const values = [
  "Fresh essentials without a long shopping journey.",
  "Deli pickup for lunch and same-day errands.",
  "Clear prices, clear stock, clear checkout.",
  "Mobile-first grocery shopping for busy routines."
];

export default function AboutPage() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">About</p>
            <h1 className="mt-4 max-w-5xl font-display text-6xl font-semibold leading-[0.88] tracking-[-0.085em] md:text-8xl">
              A local market made faster.
            </h1>
          </div>

          <p className="max-w-xl text-lg font-semibold leading-8 text-muted-foreground">
            Troy Mini Market brings everyday groceries, deli favorites, pantry staples, drinks, snacks, and home essentials into a clean online experience designed for fewer steps.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {values.map((value) => (
            <div key={value} className="rounded-[2rem] border border-border bg-card p-6 text-2xl font-black leading-tight tracking-[-0.05em]">
              {value}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
