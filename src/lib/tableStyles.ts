import { cva } from "class-variance-authority";

export const tdStyle = cva(
  "px-4 py-2 border border-green-700 text-sm md:text-base",
  {
    variants: {
      position: {
        head: "bg-green-200 font-semibold",
        body: "bg-green-100",
        first: "bg-green-300 font-bold text-green-900",
      },
    },
    defaultVariants: {
      position: "body",
    },
  }
);
