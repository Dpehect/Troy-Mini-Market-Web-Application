import { Container } from "@/components/shared/container";

export function AnnouncementBar() {
  return (
    <div className="border-b border-border bg-background">
      <Container className="flex h-9 items-center justify-center gap-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground sm:justify-between">
        <span>Troy · Delivery 30–45 min</span>
        <span className="hidden sm:inline">Pickup available today</span>
      </Container>
    </div>
  );
}
