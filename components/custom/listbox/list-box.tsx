import MovieBox from "@/components/custom/shared/movie-box";
import MovieCard from "@/components/custom/shared/movie-card";
export default function ListBox({
  movies,
  handleSelected,
  className
}: {
  movies: Movie[];
  handleSelected: (id: string) => void;
  className?: string;
}) {
  return (
    <MovieBox className={className}>
      {movies.map(movie => (
        <MovieCard key={movie.imdbID} movie={movie} handleSelected={handleSelected} />
      ))}
    </MovieBox>
  );
}
