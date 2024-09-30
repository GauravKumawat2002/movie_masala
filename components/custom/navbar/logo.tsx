import Routes from "@/lib/routes";
import Link from "next/link";
export default function Logo() {
  return (
    <span className="font-semibold hidden md:block text-lg">
      <Link href={Routes.home}>🎬 Movie-Masala</Link>
    </span>
  );
}
