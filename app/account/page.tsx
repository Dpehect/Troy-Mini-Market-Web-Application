export const dynamic = "force-dynamic";

import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { AccountDashboardClient } from "@/components/account/account-dashboard-client";

export default function AccountPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeader
          eyebrow="Account"
          title="Your market dashboard."
          description="Favorites, saved local orders, addresses, and reorder tools make repeat grocery runs faster."
        />
        <AccountDashboardClient />
      </Container>
    </section>
  );
}
