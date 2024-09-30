"use client";
import { Button } from "@/components/ui/button";
import { useWatchedMoviesStore } from "@/store/global-store";
import Routes from "@/lib/routes";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const pathName = usePathname();
  const watchedMovies = useWatchedMoviesStore((state) => state.watchedMovies);
  const resetWatchedMovies = useWatchedMoviesStore(
    (state) => state.resetWatchedMovies,
  );

  // evnet handler functions
  function handleSearchMovies() {
    router.push(pathName === Routes.watchList ? Routes.home : Routes.watchList);
  }
  function handleResetWatchedMovies() {
    resetWatchedMovies();
  }

  return (
    <div className="fixed bottom-4 right-4 flex gap-4">
      {pathName === Routes.watchList && watchedMovies.length !== 0 && (
        <Button onClick={handleResetWatchedMovies} variant={"destructive"}>
          Reset Watched Box 🎬
        </Button>
      )}
      <Button onClick={handleSearchMovies}>
        {pathName === Routes.watchList ? "Search Movies" : "Watched Movies"} 🎬
      </Button>
    </div>
  );
}
