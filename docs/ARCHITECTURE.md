# Architecture Notes

## App structure

The project uses the Next.js App Router with route-level organization:

- `/` — ultra-minimal storefront entry
- `/shop` — full product browsing with filters and sorting
- `/search` — query-aware search experience
- `/categories/[slug]` — category-specific browsing
- `/product/[slug]` — product details and add-to-cart
- `/cart` — cart review
- `/checkout` — checkout flow with validation
- `/order-success` — order confirmation
- `/orders/[id]` — order detail
- `/favorites` — saved products
- `/reorder` — buy-again and basket flows
- `/case-study` — portfolio explanation page

## State

Zustand is used for local product interaction state:

- cart store
- favorites store
- checkout/order store

Persistence is handled with localStorage through Zustand middleware.

## Data

The product system is powered by typed mock data:

- products
- categories
- baskets
- deals
- recipes
- trust badges

This makes the project easy to replace with a real backend later.

## Validation

React Hook Form and Zod are used in checkout flows to keep form logic typed, validated and user-friendly.

## UX architecture

The project intentionally separates:

- discovery pages
- product selection
- cart review
- checkout
- portfolio explanation

This avoids duplicate sections and keeps the ecommerce journey clear.
