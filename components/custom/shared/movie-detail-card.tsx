"use client";
import KEY from "@/KEY";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useSelectedMovieStore,
  useWatchedMoviesStore,
} from "@/store/global-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import StarRating from "@/components/custom/shared/star-rating";
import SpinningLoader from "@/components/custom/shared/loader";
import { useRouter } from "next/navigation";
import useFetchMovies from "@/hooks/use-fetchMovies";

// MovieDetails component
export default function MovieDetailsCard({
  className,
  parameter,
}: {
  className?: string;
  parameter: string;
}) {
  const router = useRouter();

  // state variable for userRating
  const [userRating, setUserRating] = useState<null | string>(null);
  // State variables for selected Movie //Make a globaL STATE FOR IT
  const selectedMovie = useSelectedMovieStore((state) => state.selectedMovie);
  const setSelectedMovie = useSelectedMovieStore(
    (state) => state.setSelectedMovie,
  );
  // state variable for watchedMovies
  const watchedMovies = useWatchedMoviesStore((state) => state.watchedMovies);
  const addWatchedMovies = useWatchedMoviesStore(
    (state) => state.addWatchedMovies,
  );

  const { error, isLoading, isSuccess, movies } = useFetchMovies({
    url: `https://www.omdbapi.com/?apikey=${KEY}&i=${parameter}`,
  });

  isSuccess && setSelectedMovie(movies as Movie);
  isSuccess && (document.title = `${(movies as Movie).Title}`);

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
  // Create a new watched movie object
  const newWatchedMovie: WatchedMovie = {
    imdbID: parameter as string,
    Poster: posters,
    Title: title,
    imdbRating: imdbRating,
    runtime: runtime,
    userRating: userRating as string,
    Year: released,
  };

  useEffect(() => {
    function closeMovieOnEsc(e: KeyboardEvent) {
      if (e.code === "Escape") router.back();
    }
    document.addEventListener("keydown", closeMovieOnEsc);
    return () => document.removeEventListener("keydown", closeMovieOnEsc);
  }, [parameter]);
  // Reset userRating when the component mounts or remounts
  useEffect(() => {
    setUserRating("0");
  }, []);

  // Function to handle adding the movie to the watched list
  function handleAddToWatched() {
    addWatchedMovies(newWatchedMovie);
    setUserRating("0");
    router.back();
  }
  // Function to handle setting the user rating
  const handleSetUserRating = (rating: number) => {
    setUserRating(rating.toString());
  };
  // Check if the selected movie is already in the watched list
  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(typeof parameter === "string" ? parameter : "");
  // Get the user rating of the selected movie
  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === parameter,
  )?.userRating;

  return (
    <div className={cn("", className)}>
      {isLoading && <SpinningLoader />}
      {!isLoading && !error && parameter && (
        <>
          <Button
            className="btn-back mb-4"
            onClick={() => {
              router.back();
            }}
          >
            &larr;
          </Button>
          <Card className="flex flex-col shadow-lg shadow-primary/50 dark:shadow-background sm:flex-row">
            <CardHeader className="basis-1/3">
              <div>
                <Image
                  src={posters === "N/A" ? "/" : posters}
                  alt={`Poster of ${title}`}
                  width={300}
                  height={100}
                  className="mx-auto aspect-[9/16]"
                />
              </div>

              {userRating !== "0" && (
                <Button onClick={handleAddToWatched}>Add to Watched</Button>
              )}
            </CardHeader>

            <CardContent className="basis-2/3 sm:pl-0 sm:pt-5">
              <CardTitle className="pb-4 text-2xl font-bold tracking-wider lg:text-4xl">
                {title}
              </CardTitle>
              <CardDescription className="lg:text-lg">
                <span className="text-lg font-semibold text-primary dark:text-white lg:text-xl">
                  Released :
                </span>{" "}
                📅 {released}
              </CardDescription>
              <CardDescription className="lg:text-lg">
                <span className="text-lg font-semibold text-primary dark:text-white lg:text-xl">
                  Runtime :
                </span>{" "}
                🎥 {runtime}
              </CardDescription>
              <CardDescription className="lg:text-lg">
                <span className="text-lg font-semibold text-primary dark:text-white lg:text-xl">
                  imdb Rating :
                </span>{" "}
                ⭐ {imdbRating}
              </CardDescription>
              <CardDescription className="lg:text-lg">
                <span className="text-lg font-semibold text-primary dark:text-white lg:text-xl">
                  Genre :
                </span>{" "}
                {genre}
              </CardDescription>
              <CardDescription className="lg:text-lg">
                <span className="text-lg font-semibold text-primary dark:text-white lg:text-xl">
                  Plot :
                </span>{" "}
                {plot}
              </CardDescription>
              <CardDescription className="lg:text-lg">
                <span className="text-lg font-semibold text-primary dark:text-white lg:text-xl">
                  Actors :
                </span>{" "}
                🎭 {actors}
              </CardDescription>
              <CardDescription className="lg:text-lg">
                <span className="text-lg font-semibold text-primary dark:text-white lg:text-xl">
                  Director :
                </span>{" "}
                🎬 {director}
              </CardDescription>
              <CardDescription className="lg:text-lg">
                {!isWatched ? (
                  <StarRating
                    maxRating={10}
                    onSetRating={handleSetUserRating}
                    size={24}
                  />
                ) : (
                  <>
                    {" "}
                    <span className="text-xl font-semibold text-primary dark:text-white">
                      User Rating :
                    </span>{" "}
                    You rated this movie{" "}
                    <span className="font-bold text-primary/70">
                      {watchedUserRating}
                    </span>{" "}
                  </>
                )}
              </CardDescription>
            </CardContent>
          </Card>
        </>
      )}
      {error && <h2 className="error">{error.message}</h2>}
    </div>
  );
}
