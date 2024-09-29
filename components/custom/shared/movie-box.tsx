import { cn } from "@/lib/utils";
export default function MovieBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 place-items-center gap-4 ",
        className
      )}>
      {children}
    </ul>
  );
}
