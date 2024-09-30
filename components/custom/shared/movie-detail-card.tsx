"use client";
import KEY from "@/KEY";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useLoadingStore,
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
import SpinningLoader from "./loader";
import { useRouter } from "next/navigation";

// MovieDetails component
export default function MovieDetailsCard({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  // State variables
  const [selectedMovie, setSelectedMovie] = useState<SelectedMovie | object>(
    {},
  );
  const [userRating, setUserRating] = useState<null | string>(null);

  const loading = useLoadingStore((state) => state.loading);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [error, setError] = useState<string | null>(null);
  // console.log(userRating);
  // state variable for selectedMovie Id
  const selectedMovieId = useSelectedMovieStore(
    (state) => state.selectedMovieId,
  );
  const resetSelectedMovieId = useSelectedMovieStore(
    (state) => state.resetSelectedMovieId,
  );

  // state variable for watchedMovies
  const watchedMovies = useWatchedMoviesStore((state) => state.watchedMovies);
  const addWatchedMovies = useWatchedMoviesStore(
    (state) => state.addWatchedMovies,
  );

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
    imdbID: selectedMovieId as string,
    Poster: posters,
    Title: title,
    imdbRating: imdbRating,
    runtime: runtime,
    userRating: userRating as string,
    Year: released,
  };

  // Fetch movie details when selectedMovieId changes
  useEffect(() => {
    const controller = new AbortController();
    async function getMoviesDetails() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`,
          {
            signal: controller.signal,
            method: "GET",
          },
        );

        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error);
        setSelectedMovie(data);
        if (selectedMovieId) document.title = `${data.Title}`;
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name !== "AbortError") {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred",
          );
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
  }, [selectedMovieId, setLoading]);

  // Close the movie details component when the user presses the escape key
  useEffect(() => {
    function closeMovieOnEsc(e: KeyboardEvent) {
      if (e.code === "Escape") {
        resetSelectedMovieId();
      }
    }

    document.addEventListener("keydown", closeMovieOnEsc);
    return () => document.removeEventListener("keydown", closeMovieOnEsc);
  }, [selectedMovieId, resetSelectedMovieId]);

  // Reset userRating when the component mounts or remounts
  useEffect(() => {
    setUserRating("0");
  }, []);

  // Function to handle adding the movie to the watched list
  function handleAddToWatched() {
    addWatchedMovies(newWatchedMovie);
    setUserRating("0");
    resetSelectedMovieId();
    router.back();
  }

  // Function to handle setting the user rating
  const handleSetUserRating = (rating: number) => {
    setUserRating(rating.toString());
  };

  // Check if the selected movie is already in the watched list
  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(typeof selectedMovieId === "string" ? selectedMovieId : "");

  // Get the user rating of the selected movie
  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === selectedMovieId,
  )?.userRating;

  return (
    <div className={cn("", className)}>
      {loading && <SpinningLoader />}
      {!loading && !error && selectedMovieId && (
        <>
          <Button
            className="btn-back mb-4"
            onClick={() => {
              resetSelectedMovieId();
              router.back();
            }}
          >
            &larr;
          </Button>
          <Card className="flex flex-col shadow-lg shadow-primary/50 dark:shadow-background lg:flex-row">
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

            <CardContent className="basis-2/3 lg:pl-0 lg:pt-5">
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
      {error && <h2 className="error">{error}</h2>}
    </div>
  );
}
