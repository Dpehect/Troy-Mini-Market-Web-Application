import { cn } from "@/lib/utils";

export function Container({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container-px mx-auto w-full max-w-7xl", className)}>{children}</div>;
}
