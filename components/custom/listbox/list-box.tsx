import { useEffect } from "react";
import { useErrorStore, useLoadingStore, useMovieStore, useQueryStore } from "@/store/global-store";
import MovieBox from "@/components/custom/shared/movie-box";
import MovieCard from "@/components/custom/shared/movie-card";
import SpinningLoader from "../shared/loader";
import KEY from "@/KEY";

export default function ListBox({ className }: { className?: string }) {
  const query = useQueryStore(state => state.query);
  // state for movies
  const movies = useMovieStore(state => state.movies);
  const setMovies = useMovieStore(state => state.setMovies);
  //  state for loading
  const loading = useLoadingStore(state => state.loading);
  const setLoading = useLoadingStore(state => state.setLoading);
  // state for error
  const error = useErrorStore(state => state.error);
  const setError = useErrorStore(state => state.setError);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        setLoading(true);

        try {
          const response = await fetch(
            `https://www.omdbapi.com/?i=tt1375666&apikey=${KEY}&s=${query}`,
            { signal: controller.signal, method: "GET" }
          );
          if (!response.ok) throw new Error("Failed to fetch Movies");
          const data = await response.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovies(data.Search);
        } catch (err) {
          if (err instanceof Error && err.name !== "AbortError") {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      }

      if (!query.length) {
        setError("");
        setMovies([]);
        return;
      }

      fetchMovies();
      return () => {
        setError("");
        controller.abort();
      };
    },
    [query, setMovies, setLoading, setError]
  );

  return (
    <>
      {loading && <SpinningLoader />}
      {!loading && !error && movies && (
        <MovieBox className={className}>
          {movies.map(movie => (
            <MovieCard cardType="MovieCard" key={movie.imdbID} movie={movie} />
          ))}
        </MovieBox>
      )}
      {!loading && error && (
        <div className="grid place-items-center mt-20">
          <p className="text-semibold text-3xl text-red-800 dark:text-red-500"> {error}</p>
        </div>
      )}
    </>
  );
}
