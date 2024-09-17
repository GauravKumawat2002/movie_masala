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
        "grid grid-cols-3 place-items-center gap-4 h-[75dvh]  overflow-y-scroll",
        className
      )}>
      {children}
    </ul>
  );
}
