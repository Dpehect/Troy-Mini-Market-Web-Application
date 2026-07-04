export type Currency = "USD";

export type ProductUnit =
  | "each"
  | "lb"
  | "oz"
  | "gal"
  | "qt"
  | "pack"
  | "bottle"
  | "box"
  | "bag"
  | "tub"
  | "roll"
  | "can"
  | "jar"
  | "carton"
  | "bunch"
  | "loaf"
  | "tray"
  | "bowl"
  | "cup"
  | "tube"
  | "jug";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  currency: Currency;
  unit: ProductUnit;
  size: string;
  unitPrice?: string;
  image: string;
  gallery?: string[];
  description: string;
  ingredients?: string[];
  nutrition?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
    sodium?: string;
  };
  allergens?: string[];
  origin?: string;
  stock: number;
  isFresh?: boolean;
  isLocal?: boolean;
  isOrganic?: boolean;
  isPopular?: boolean;
  isDiscounted?: boolean;
  isDeliMade?: boolean;
  deliveryTag: string;
  rating?: number;
  reviewsCount?: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  icon: string;
  description: string;
  productCount: number;
  featured: boolean;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
};

export type Recipe = {
  id: string;
  title: string;
  slug: string;
  image: string;
  duration: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  productIds: string[];
  steps: string[];
};

export type OrderStatus =
  | "Preparing"
  | "Ready for pickup"
  | "Out for delivery"
  | "Delivered"
  | "Cancelled";

export type DeliveryType = "delivery" | "pickup";

export type SubstitutionPreference =
  | "replace"
  | "remove"
  | "contact"
  | "no-substitutions";

export type PaymentMethod = "card" | "apple-pay" | "cash-on-delivery";

export type CheckoutDetails = {
  email: string;
  phone: string;
  fullName: string;
  deliveryType: DeliveryType;
  address: string;
  apartment?: string;
  instructions?: string;
  deliverySlot: string;
  substitutionPreference: SubstitutionPreference;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  bagPreference: "paper" | "reusable" | "no-preference";
};

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryType: DeliveryType;
  deliveryAddress: string;
  deliverySlot: string;
  substitutionPreference?: SubstitutionPreference;
  paymentMethod?: PaymentMethod;
  contact?: {
    email: string;
    phone: string;
    fullName: string;
  };
  progress?: {
    label: string;
    completed: boolean;
    time?: string;
  }[];
};

export type Basket = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  productIds: string[];
  estimatedTotal: number;
  itemCount: number;
  occasion: string;
};

export type Deal = {
  id: string;
  title: string;
  description: string;
  badge: string;
  image: string;
  href: string;
};

export type TrustBadgeItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type ProductSort =
  | "popular"
  | "price-low"
  | "price-high"
  | "deals"
  | "fresh"
  | "local"
  | "rating";

export type ProductFlagFilter =
  | "deals"
  | "fresh"
  | "local"
  | "organic"
  | "deli"
  | "in-stock";

export type Address = {
  id: string;
  label: string;
  line1: string;
  apartment?: string;
  instructions?: string;
  isDefault?: boolean;
};

export type DeliverySlot = {
  id: string;
  label: string;
  window: string;
  feeLabel: string;
  availability: "available" | "busy" | "full";
};
