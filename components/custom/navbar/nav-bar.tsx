import { cn } from "@/lib/utils";

export default function Navbar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <nav
      className={cn(
        "flex justify-between items-center px-4 py-2  mx-auto rounded-lg border dark:border-b-4 shadow-lg bg-background dark:bg-background dark:shadow-background",
        className
      )}>
      {children}
    </nav>
  );
}
