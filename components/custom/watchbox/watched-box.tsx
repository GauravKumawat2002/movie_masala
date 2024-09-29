import { useWatchedMoviesStore } from "@/store/global-store";
import MovieCard from "@/components/custom/shared/movie-card";
import MovieBox from "@/components/custom/shared/movie-box";

export default function WatchedBox({ className }: { className?: string }) {
  const watchedMovies = useWatchedMoviesStore(state => state.watchedMovies);
  return (
    <MovieBox className={className}>
      {watchedMovies.map(movie => (
        <MovieCard cardType="WatchedMovieCard" key={movie.imdbID} movie={movie} />
      ))}
    </MovieBox>
  );
}
