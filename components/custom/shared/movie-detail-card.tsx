import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import StarRating from "@/components/custom/shared/star-rating";
import { useSelectedMovieStore, useWatchedMoviesStore } from "@/store/global-store";
import SpinningLoader from "./loader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import KEY from "@/KEY";

// MovieDetails component
export default function MovieDetailsCard({ className }: { className?: string }) {
  // State variables
  const [selectedMovie, setSelectedMovie] = useState<SelectedMovie | {}>({});
  const [userRating, setUserRating] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(userRating);
  // state variable for selectedMovie Id
  const selectedMovieId = useSelectedMovieStore(state => state.selectedMovieId);
  const resetSelectedMovieId = useSelectedMovieStore(state => state.resetSelectedMovieId);

  // state variable for watchedMovies
  const watchedMovies = useWatchedMoviesStore(state => state.watchedMovies);
  const addWatchedMovies = useWatchedMoviesStore(state => state.addWatchedMovies);

  // these two will be called watched-movie-card component not here
  // const removeWatchedMovies = useWatchedMoviesStore(state => state.removeWatchedMovies);
  // const resetWatchedMovies = useWatchedMoviesStore(state => state.resetWatchedMovies);

  // Check if the selected movie is already in the watched list
  const isWatched = watchedMovies
    .map(movie => movie.imdbID)
    .includes(typeof selectedMovieId === "string" ? selectedMovieId : "");

  // Get the user rating of the selected movie
  const watchedUserRating = watchedMovies.find(
    movie => movie.imdbID === selectedMovieId
  )?.userRating;

  // Destructure properties from selectedMovie
  const {
    Actors: actors,
    Poster: posters,
    Title: title,
    Runtime: runtime,
    Released: released,
    imdbRating,
    Director: director,
    Genre: genre,
    Plot: plot,
  } = selectedMovie as SelectedMovie;

  // Fetch movie details when selectedMovieId changes
  useEffect(() => {
    const controller = new AbortController();
    async function getMoviesDetails() {
      try {
        setLoading(true);
        const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`, {
          signal: controller.signal,
          method: "GET",
        });

        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error);
        setSelectedMovie(data);
        if (selectedMovieId) document.title = `${data.Title}`;
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
      } finally {
        setError(null);
        setLoading(false);
      }
    }
    selectedMovieId && getMoviesDetails();
    return () => {
      controller.abort();
      document.title = "Movie Masala";
    };
  }, [selectedMovieId]);

  // Close the movie details component when the user presses the escape key
  useEffect(() => {
    function closeMovieOnEsc(e: KeyboardEvent) {
      if (e.code === "Escape") {
        resetSelectedMovieId();
      }
    }

    document.addEventListener("keydown", closeMovieOnEsc);
    return () => document.removeEventListener("keydown", closeMovieOnEsc);
  }, [selectedMovieId]);

  // Reset userRating when the component mounts or remounts
  useEffect(() => {
    setUserRating("0");
  }, []);

  // Create a new watched movie object
  const newWatchedMovie: WatchedMovie = {
    imdbID: selectedMovieId as string,
    Poster: posters,
    Title: title,
    imdbRating: imdbRating,
    runtime: runtime,
    userRating: userRating as string,
    Year: released,
  };

  // Function to handle adding the movie to the watched list
  function handleAddToWatched() {
    addWatchedMovies(newWatchedMovie);
    setUserRating("0");
    console.log(watchedMovies);
    resetSelectedMovieId();
  }

  // Function to handle setting the user rating
  const handleSetUserRating = (rating: number) => {
    setUserRating(rating.toString());
  };

  return (
    <div className={cn("", className)}>
      {loading && <SpinningLoader />}
      {!loading && !error && selectedMovieId && (
        <>
          <Button className="btn-back mb-4" onClick={resetSelectedMovieId}>
            &larr;
          </Button>
          <Card className="flex-row flex shadow-primary/50 shadow-lg dark:shadow-background">
            <CardHeader className="basis-1/2">
              <Image
                src={posters}
                alt={`Poster of ${title}`}
                width={150}
                height={200}
                className="w-full"
              />
              {isWatched && (
                <p className="text-center">
                  You rated this movie{" "}
                  <span className="font-semibold text-lg">{watchedUserRating}</span>{" "}
                </p>
              )}
              {userRating !== "0" && <Button onClick={handleAddToWatched}>Add to Watched</Button>}
            </CardHeader>

            <CardContent className="pt-5 pl-0 basis-1/2">
              <CardTitle className="text-2xl tracking-wider font-bold">{title}</CardTitle>
              <CardDescription>
                <span className="text-bold text-lg dark:text-white">Released :</span> 📅 {released}
              </CardDescription>
              <CardDescription>
                <span className="text-bold text-lg dark:text-white">Runtime :</span> 🎥 {runtime}
              </CardDescription>
              <CardDescription>
                <span className="text-bold text-lg dark:text-white">imdb Rating :</span> ⭐{" "}
                {imdbRating}
              </CardDescription>
              <CardDescription className="text-balance">
                <span className="text-bold text-lg dark:text-white">Genre :</span> {genre}
              </CardDescription>
              <CardDescription className="text-balance">
                <span className="text-bold text-lg dark:text-white">Plot :</span> {plot}
              </CardDescription>
              <CardDescription className="text-balance">
                <span className="text-bold text-lg dark:text-white">Actors :</span> 🎭 {actors}
              </CardDescription>
              <CardDescription className="text-balance">
                <span className="text-bold text-lg dark:text-white">Director :</span> 🎬 {director}
              </CardDescription>
              <CardDescription>
                {!isWatched && (
                  <StarRating maxRating={10} onSetRating={handleSetUserRating} size={24} />
                )}
              </CardDescription>
            </CardContent>
          </Card>
        </>
      )}
      {error && <h2 className="error">{error}</h2>}
    </div>
  );
}
