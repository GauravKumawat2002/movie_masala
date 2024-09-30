"use client";
import KEY from "@/KEY";
import { useMovieStore, useQueryStore } from "@/store/global-store";
import MovieBox from "@/components/custom/shared/movie-box";
import MovieCard from "@/components/custom/shared/movie-card";
import SpinningLoader from "../shared/loader";
import useFetchMovies from "@/hooks/use-fetchMovies";

export default function ListBox({ className }: { className?: string }) {
  const query = useQueryStore((state) => state.query);
  const setMovies = useMovieStore((state) => state.setMovies);
  const { movies, isLoading, error, isSuccess } = useFetchMovies({
    url: `https://www.omdbapi.com/?i=tt1375666&apikey=${KEY}&s=${query}`,
  });
  //
  if (isSuccess && Array.isArray(movies)) setMovies(movies);

  return (
    <>
      {isLoading && <SpinningLoader />}
      {!isLoading && !error && Array.isArray(movies) && (
        <MovieBox className={className}>
          {movies.map((movie: Movie) => (
            <MovieCard cardType="MovieCard" key={movie.imdbID} movie={movie} />
          ))}
        </MovieBox>
      )}
      {!isLoading && error && (
        <div className="mt-20 grid place-items-center">
          <p className="text-semibold text-3xl text-red-800 dark:text-red-500">
            {error.message}
          </p>
        </div>
      )}
    </>
  );
}
