export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07
    }
  }
};

export const subtleScale = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.015, y: -3 }
};
