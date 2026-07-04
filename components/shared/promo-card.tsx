import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Deal } from "@/types";
import { Badge } from "@/components/ui/badge";

export function PromoCard({ deal }: { deal: Deal }) {
  return (
    <Link
      href={deal.href}
      className="focus-ring group relative block min-h-[260px] overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground shadow-card"
    >
      <Image
        src={deal.image}
        alt={deal.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover opacity-70 transition duration-300 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <Badge variant="warning" className="mb-3 border-none bg-warning text-foreground">
          {deal.badge}
        </Badge>
        <h3 className="text-2xl font-black tracking-tight">{deal.title}</h3>
        <p className="mt-2 text-sm leading-6 text-primary-foreground/82">{deal.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
          Browse deal
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
