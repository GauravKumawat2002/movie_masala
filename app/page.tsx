"use client";
import ListBox from "@/components/custom/listbox/list-box";
import WatchedBox from "@/components/custom/watchbox/watched-box";
import MovieDetailsCard from "@/components/custom/shared/movie-detail-card";
import { useOnWatchedMoviesStore, useSelectedMovieStore } from "@/store/global-store";

export default function Home() {
  const onWatchedBox = useOnWatchedMoviesStore(state => state.onWatchedMovies);
  const selectedMovieId = useSelectedMovieStore(state => state.selectedMovieId);
  return (
    <>
      {selectedMovieId === null ? (
        <>
          {!onWatchedBox ? (
            <ListBox className="mt-4 mb-16" />
          ) : (
            <WatchedBox className="mt-4 mb-16" />
          )}
        </>
      ) : (
        <MovieDetailsCard className="mt-3 pl-4 mb-16" />
      )}
    </>
  );
}
