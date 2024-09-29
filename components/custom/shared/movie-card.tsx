import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useSelectedMovieStore, useWatchedMoviesStore } from "@/store/global-store";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
export default function MovieCard({
  movie,
  cardType,
}: {
  movie: Movie | WatchedMovie;
  cardType: "MovieCard" | "WatchedMovieCard";
}) {
  const setSelectedMovieId = useSelectedMovieStore(state => state.setSelectedMovieId);
  const removeWatchedMovies = useWatchedMoviesStore(state => state.removeWatchedMovies);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleKeyDown = (e: React.KeyboardEvent, movieId: string) => {
    if (e.key === "Enter") {
      setSelectedMovieId(movieId);
    }
  };

  if (cardType === "MovieCard")
    return (
      <li
        tabIndex={0}
        onClick={() => setSelectedMovieId(movie.imdbID)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={event => handleKeyDown(event, movie.imdbID)}
        style={{ outline: "none" }}>
        <Card
          className="shadow-primary hover:cursor-pointer hover:brightness-75 hover:contrast-[130%] h-[22rem] shadow-sm dark:shadow-background dark:shadow-lg"
          style={{
            filter: isFocused ? "brightness(75%) contrast(130%)" : "none",
          }}>
          <CardHeader>
            <Image
              src={movie.Poster === "N/A" ? "/" : movie.Poster}
              alt={`${movie.Title} poster`}
              width={150}
              height={200}
              className="mx-auto aspect-[2/3]"
            />
            <CardTitle className="text-wrap">{movie.Title} </CardTitle>
          </CardHeader>
          <CardContent className="">
            <CardDescription>
              <span>🗓</span> <span>{movie.Year}</span>
            </CardDescription>
          </CardContent>
        </Card>
      </li>
    );

  if (cardType === "WatchedMovieCard") {
    const watchedMovie = movie as WatchedMovie;
    const handleDeleteButtonDown = (event: React.KeyboardEvent, movieId: string) => {
      event.stopPropagation(); // Necessary to prevent the movie card from being selected
      if (event.key === "Enter") {
        removeWatchedMovies(movieId);
      }
    };

    return (
      <li
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={event => handleKeyDown(event, watchedMovie.imdbID)}
        onClick={() => setSelectedMovieId(watchedMovie.imdbID)}
        style={{ outline: "none" }}>
        <Card
          className="shadow-primary hover:!brightness-75 hover:!contrast-[130%] hover:cursor-pointer  shadow-sm dark:shadow-background dark:shadow-lg"
          style={{
            filter: isFocused ? "brightness(75%) contrast(130%)" : "none",
          }}>
          <CardHeader>
            <Image
              src={watchedMovie.Poster === "N/A" ? "/" : watchedMovie.Poster}
              alt={`${watchedMovie.Title} poster`}
              width={150}
              height={200}
              className="mx-auto aspect-[2/3]"
            />
            <CardTitle className="text-center">{watchedMovie.Title} </CardTitle>
          </CardHeader>
          <div>
            <CardContent className=" md:pt-0 text-center md:pl-4">
              <CardDescription>
                <span className="font-semibold">Year:</span>{" "}
                <span className="font-bold">{watchedMovie.Year}</span>
              </CardDescription>
              <CardDescription>
                <span className=" font-semibold">imdb Rating:</span>{" "}
                <span className="font-bold">{watchedMovie.imdbRating}</span>
              </CardDescription>
              <CardDescription>
                <span className=" font-semibold">Runtime:</span>{" "}
                <span className="font-bold">{watchedMovie.runtime}</span>
              </CardDescription>
              <CardDescription>
                <span className=" font-semibold">User Rating:</span>{" "}
                <span className="font-bold">{watchedMovie.userRating} stars</span>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                className="mx-auto"
                onClick={e => {
                  e.stopPropagation();
                  removeWatchedMovies(watchedMovie.imdbID);
                }}
                onKeyDown={event => handleDeleteButtonDown(event, watchedMovie.imdbID)}
                size={"icon"}
                variant={"destructive"}>
                <Trash2 size={12} />
              </Button>
            </CardFooter>
          </div>
        </Card>
      </li>
    );
  }
}
