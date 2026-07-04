import type { Deal } from "@/types";

export const deals: Deal[] = [
  {
    id: "deal-breakfast",
    title: "Weekend Breakfast Deals",
    description: "Save on eggs, milk, bagels, juice, yogurt, and easy morning staples.",
    badge: "Save up to 20%",
    image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1200&auto=format&fit=crop",
    href: "/deals/breakfast"
  },
  {
    id: "deal-produce",
    title: "Fresh Produce Specials",
    description: "Hand-picked fruits and vegetables with fresh pricing all week.",
    badge: "Fresh today",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1200&auto=format&fit=crop",
    href: "/deals/produce"
  },
  {
    id: "deal-deli",
    title: "Deli Favorites",
    description: "Made-today sandwiches, wraps, and quick lunch picks from the counter.",
    badge: "Made in store",
    image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=1200&auto=format&fit=crop",
    href: "/deals/deli"
  },
  {
    id: "deal-household",
    title: "Household Essentials",
    description: "Paper goods, cleaners, and basics you always need at home.",
    badge: "Everyday value",
    image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?q=80&w=1200&auto=format&fit=crop",
    href: "/deals/household"
  }
];
