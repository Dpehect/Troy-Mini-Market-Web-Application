export const dynamic = "force-dynamic";

import { Container } from "@/components/shared/container";
import { OrderTrackingClient } from "@/components/orders/order-tracking-client";

export default async function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section className="py-12 md:py-16">
      <Container>
        <OrderTrackingClient orderId={id} />
      </Container>
    </section>
  );
}
