"use client";
import { useMovieStore, useWatchedMoviesStore } from "@/store/global-store";
import { usePathname } from "next/navigation";
import Routes from "@/lib/routes";
export default function NumResult() {
  const pathName = usePathname();
  const movies = useMovieStore((state) => state.movies);
  const watchedMovies = useWatchedMoviesStore((state) => state.watchedMovies);

  return (
    <>
      {movies.length !== 0 && Routes.home === pathName && (
        <p className="text-center text-sm text-primary md:text-base">
          Found <strong>{movies.length}</strong>{" "}
          {movies.length === 1 ? "result" : "results"}
        </p>
      )}
      {Routes.watchList === pathName && (
        <p className="text-center text-sm text-primary md:text-base">
          <strong>{watchedMovies.length}</strong> movies Watched
        </p>
      )}
    </>
  );
}
