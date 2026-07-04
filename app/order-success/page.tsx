export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Container } from "@/components/shared/container";
import { OrderSuccessClient } from "@/components/orders/order-success-client";

export default function OrderSuccessPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <Suspense fallback={<div className="rounded-3xl border border-border bg-card p-8 shadow-soft">Loading order…</div>}>
          <OrderSuccessClient />
        </Suspense>
      </Container>
    </section>
  );
}
