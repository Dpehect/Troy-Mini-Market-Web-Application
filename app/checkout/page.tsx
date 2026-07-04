export const dynamic = "force-dynamic";

import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export default function CheckoutPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeader
          eyebrow="Checkout"
          title="Complete your order."
          description="Choose delivery or pickup, confirm timing, set substitution preferences, and place a realistic mock grocery order."
        />
        <CheckoutClient />
      </Container>
    </section>
  );
}
