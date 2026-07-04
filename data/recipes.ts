import type { Recipe } from "@/types";

export const recipes: Recipe[] = [
  {
    id: "recipe-pasta-night",
    title: "15-Minute Pasta Night",
    slug: "15-minute-pasta-night",
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=1200&auto=format&fit=crop",
    duration: "15 min",
    servings: 2,
    difficulty: "Easy",
    ingredients: ["Penne pasta", "Roma tomatoes", "Sharp cheddar", "Sourdough bread"],
    productIds: ["prod-pasta", "prod-roma-tomatoes", "prod-cheddar-cheese", "prod-sourdough-bread"],
    steps: ["Boil pasta.", "Warm chopped tomatoes.", "Finish with cheese.", "Serve with toasted bread."]
  },
  {
    id: "recipe-breakfast-bowl",
    title: "Greek Yogurt Breakfast Bowl",
    slug: "greek-yogurt-breakfast-bowl",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
    duration: "8 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Greek yogurt", "Fresh strawberries", "Organic bananas"],
    productIds: ["prod-greek-yogurt", "prod-strawberries", "prod-organic-bananas"],
    steps: ["Spoon yogurt into a bowl.", "Add sliced fruit.", "Finish with honey or granola if desired."]
  }
];
