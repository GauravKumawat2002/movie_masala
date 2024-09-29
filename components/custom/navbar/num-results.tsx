"use client";
import {
  useMovieStore,
  useOnWatchedMoviesStore,
  useWatchedMoviesStore,
} from "@/store/global-store";
export default function NumResult() {
  const movies = useMovieStore(state => state.movies);
  const onWatchedMovies = useOnWatchedMoviesStore(state => state.onWatchedMovies);
  const watchedMovies = useWatchedMoviesStore(state => state.watchedMovies);
  return (
    <>
      {movies.length !== 0 && !onWatchedMovies && (
        <p className="text-primary text-sm md:text-base text-center">
          Found <strong>{movies.length}</strong> {movies.length === 1 ? "result" : "results"}
        </p>
      )}
      {onWatchedMovies && (
        <p className="text-primary text-sm md:text-base text-center">
          <strong>{watchedMovies.length}</strong> movies Watched
        </p>
      )}
    </>
  );
}
