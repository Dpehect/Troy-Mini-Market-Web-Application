# Troy Mini Market Web Application
Live link : https://troy-mini-market-web-application.vercel.app/

Troy Mini Market Web Application is a professional, ultra-minimal local grocery ecommerce experience built with a focus on performance, robust state management, and user-first UX.

## Architecture and Technology Stack

The application leverages a modern, component-driven architecture designed for high scalability and rapid content delivery. 

### Core Technologies

*   **Framework**: Built on Next.js 15, utilizing React 19 features for optimized server-side rendering (SSR), static site generation (SSG), and seamless client-side hydration.
*   **Language**: Strongly typed with TypeScript, ensuring type safety across the entire codebase and reducing runtime errors.
*   **Styling**: Utilizes Tailwind CSS alongside utility libraries like clsx and tailwind-merge for dynamic and conditional class application. This approach ensures consistent design tokens and minimal CSS bundle sizes.
*   **State Management**: Implements Zustand for global state management, providing a lightweight, fast, and scalable alternative to complex boilerplate architectures, coupled with React Hook Form for efficient form state handling.
*   **Animation**: Integrates Framer Motion and GSAP for complex, performant, and hardware-accelerated animations that enhance the user experience without compromising frame rates. Lenis is incorporated for smooth scrolling capabilities.
*   **Data Validation**: Uses Zod for schema validation, ensuring strict data integrity at the boundaries, especially when processing form submissions through hookform resolvers.
*   **UI Components**: Employs Radix UI primitives for accessible, unstyled foundation components, allowing customized design systems while maintaining WAI-ARIA compliance.

### Deployment Readiness

The architecture is fully integrated with the Vercel deployment ecosystem. Route structures, API configurations, and rendering strategies are pre-configured to utilize Vercel's Edge Network seamlessly. The repository requires zero additional configuration to be deployed as a highly available, globally distributed application on Vercel.
