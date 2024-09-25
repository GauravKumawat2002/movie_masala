import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelectedMovieStore } from "@/store/global-store";
import Image from "next/image";
export default function MovieCard({
  movie,
  cardType,
}: {
  movie: Movie | WatchedMovie;
  cardType: "MovieCard" | "WatchedMovieCard";
}) {
  const setSelectedMovieId = useSelectedMovieStore(state => state.setSelectedMovieId);

  if (cardType === "MovieCard")
    return (
      <li onClick={() => setSelectedMovieId(movie.imdbID)}>
        <Card className="shadow-primary shadow-sm dark:shadow-background dark:shadow-lg">
          <CardHeader>
            <Image
              src={movie.Poster === "N/A" ? "/" : movie.Poster}
              alt={`${movie.Title} poster`}
              width={150}
              height={200}
              className="w-full"
            />
            <CardTitle className="text-wrap">{movie.Title} </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <span>🗓</span> <span>{movie.Year}</span>
            </CardDescription>
          </CardContent>
        </Card>
      </li>
    );

  if (cardType === "WatchedMovieCard") {
    const watchedMovie = movie as WatchedMovie;
    return (
      <li>
        <Card className="shadow-primary shadow-sm dark:shadow-background dark:shadow-lg">
          <CardHeader>
            <Image
              src={watchedMovie.Poster === "N/A" ? "/" : watchedMovie.Poster}
              alt={`${watchedMovie.Title} poster`}
              width={150}
              height={200}
              className="w-full"
            />
            <CardTitle className="text-wrap">{watchedMovie.Title} </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <span>🗓</span> <span>{watchedMovie.Year}</span>
            </CardDescription>
            <CardDescription>
              <span>🗓</span> <span>{watchedMovie.imdbRating}</span>
            </CardDescription>
            <CardDescription>
              <span>🗓</span> <span>{watchedMovie.runtime}</span>
            </CardDescription>
          </CardContent>
        </Card>
      </li>
    );
  }
}
