import type { Basket } from "@/types";

export const baskets: Basket[] = [
  {
    id: "basket-breakfast",
    title: "Breakfast Basket",
    slug: "breakfast-basket",
    description: "Milk, eggs, bagels, yogurt, fruit, and orange juice for an easy morning.",
    image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1200&auto=format&fit=crop",
    productIds: ["prod-whole-milk", "prod-large-brown-eggs", "prod-fresh-bagels", "prod-plain-greek-yogurt", "prod-orange-juice"],
    estimatedTotal: 23.75,
    itemCount: 5,
    occasion: "Morning essentials"
  },
  {
    id: "basket-movie-night",
    title: "Movie Night Snacks",
    slug: "movie-night-snacks",
    description: "Drinks, salty snacks, sweet treats, and easy shareable favorites.",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1200&auto=format&fit=crop",
    productIds: ["prod-spring-water", "prod-sea-salt-potato-chips", "prod-chocolate-chip-cookies", "prod-popcorn-kernels"],
    estimatedTotal: 18.4,
    itemCount: 4,
    occasion: "Weekend plans"
  },
  {
    id: "basket-pasta-night",
    title: "Pasta Dinner Kit",
    slug: "pasta-dinner-kit",
    description: "Pasta, tomatoes, cheese, bread, and simple dinner building blocks.",
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=1200&auto=format&fit=crop",
    productIds: ["prod-penne-pasta", "prod-roma-tomatoes", "prod-sharp-cheddar-cheese", "prod-sourdough-bread"],
    estimatedTotal: 16.46,
    itemCount: 4,
    occasion: "Dinner solved"
  },
  {
    id: "basket-weekly",
    title: "Weekly Essentials",
    slug: "weekly-essentials",
    description: "The basics most homes need: milk, eggs, bread, produce, water, and towels.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    productIds: ["prod-whole-milk", "prod-large-brown-eggs", "prod-sourdough-bread", "prod-organic-bananas", "prod-spring-water", "prod-paper-towels"],
    estimatedTotal: 34.2,
    itemCount: 6,
    occasion: "Weekly reset"
  },
  {
    id: "basket-cleaning-day",
    title: "Cleaning Day Basket",
    slug: "cleaning-day-basket",
    description: "Paper towels, all-purpose cleaner, dish soap, trash bags, and sponges.",
    image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?q=80&w=1200&auto=format&fit=crop",
    productIds: ["prod-paper-towels", "prod-all-purpose-cleaner", "prod-dish-soap-lemon", "prod-trash-bags", "prod-sponges"],
    estimatedTotal: 27.45,
    itemCount: 5,
    occasion: "Home reset"
  },
  {
    id: "basket-student-budget",
    title: "Student Budget Basket",
    slug: "student-budget-basket",
    description: "Affordable staples for quick meals, snacks, drinks, and simple breakfasts.",
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=1200&auto=format&fit=crop",
    productIds: ["prod-penne-pasta", "prod-marinara-sauce", "prod-large-brown-eggs", "prod-tortilla-chips", "prod-spring-water"],
    estimatedTotal: 21.35,
    itemCount: 5,
    occasion: "Budget-friendly"
  }
];
