import type { Category } from "@/types";

export const categories: Category[] = [
  {
    "id": "cat-fresh-produce",
    "name": "Fresh Produce",
    "slug": "fresh-produce",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    "icon": "Apple",
    "description": "Seasonal fruits, vegetables, herbs, and daily-picked essentials.",
    "productCount": 17,
    "featured": true
  },
  {
    "id": "cat-dairy-eggs",
    "name": "Dairy & Eggs",
    "slug": "dairy-eggs",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=1200&auto=format&fit=crop",
    "icon": "Milk",
    "description": "Milk, cheese, yogurt, butter, eggs, and breakfast staples.",
    "productCount": 14,
    "featured": true
  },
  {
    "id": "cat-bakery",
    "name": "Bakery",
    "slug": "bakery",
    "image": "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1200&auto=format&fit=crop",
    "icon": "Croissant",
    "description": "Fresh bread, bagels, pastries, rolls, and daily bakery picks.",
    "productCount": 10,
    "featured": true
  },
  {
    "id": "cat-deli",
    "name": "Deli",
    "slug": "deli",
    "image": "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=1200&auto=format&fit=crop",
    "icon": "Sandwich",
    "description": "Made-to-order sandwiches, wraps, salads, and deli favorites.",
    "productCount": 15,
    "featured": true
  },
  {
    "id": "cat-meat-seafood",
    "name": "Meat & Seafood",
    "slug": "meat-seafood",
    "image": "https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=1200&auto=format&fit=crop",
    "icon": "Beef",
    "description": "Chicken, beef, seafood, and simple dinner-ready proteins.",
    "productCount": 12,
    "featured": false
  },
  {
    "id": "cat-pantry",
    "name": "Pantry",
    "slug": "pantry",
    "image": "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=1200&auto=format&fit=crop",
    "icon": "Package",
    "description": "Pasta, rice, sauces, canned goods, coffee, tea, and cooking basics.",
    "productCount": 18,
    "featured": true
  },
  {
    "id": "cat-snacks",
    "name": "Snacks",
    "slug": "snacks",
    "image": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1200&auto=format&fit=crop",
    "icon": "Cookie",
    "description": "Chips, cookies, candy, nuts, bars, and movie-night favorites.",
    "productCount": 12,
    "featured": false
  },
  {
    "id": "cat-drinks",
    "name": "Drinks",
    "slug": "drinks",
    "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop",
    "icon": "CupSoda",
    "description": "Water, juice, soda, coffee drinks, teas, and energy drinks.",
    "productCount": 12,
    "featured": true
  },
  {
    "id": "cat-frozen",
    "name": "Frozen",
    "slug": "frozen",
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop",
    "icon": "Snowflake",
    "description": "Frozen meals, vegetables, pizza, desserts, and ice cream.",
    "productCount": 10,
    "featured": false
  },
  {
    "id": "cat-household",
    "name": "Household",
    "slug": "household",
    "image": "https://images.unsplash.com/photo-1583947581924-860bda6a26df?q=80&w=1200&auto=format&fit=crop",
    "icon": "Sparkles",
    "description": "Paper goods, cleaners, laundry basics, bags, and kitchen supplies.",
    "productCount": 12,
    "featured": false
  },
  {
    "id": "cat-personal-care",
    "name": "Personal Care",
    "slug": "personal-care",
    "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop",
    "icon": "Heart",
    "description": "Soap, shampoo, dental care, deodorant, and everyday care items.",
    "productCount": 10,
    "featured": false
  },
  {
    "id": "cat-local-favorites",
    "name": "Local Favorites",
    "slug": "local-favorites",
    "image": "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1200&auto=format&fit=crop",
    "icon": "MapPin",
    "description": "Neighborhood picks, local treats, deli specials, and staff favorites.",
    "productCount": 10,
    "featured": true
  }
];


export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
