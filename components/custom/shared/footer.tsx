"use client";
import { Button } from "@/components/ui/button";
import {
  useWatchedMoviesStore,
  useSelectedMovieStore,
  useOnWatchedMoviesStore,
} from "@/store/global-store";

export default function Footer() {
  const watchedMovies = useWatchedMoviesStore(state => state.watchedMovies);
  const onWatchedBox = useOnWatchedMoviesStore(state => state.onWatchedMovies);
  const resetWatchedMovies = useWatchedMoviesStore(state => state.resetWatchedMovies);
  const setOnWatchedBox = useOnWatchedMoviesStore(state => state.setOnWatchedMovies);
  const resetSelectedMovieId = useSelectedMovieStore(state => state.resetSelectedMovieId);
  return (
    <div className="flex gap-4 bottom-4 fixed right-4">
      {onWatchedBox && watchedMovies.length !== 0 && (
        <Button
          onClick={() => {
            resetWatchedMovies();
            resetSelectedMovieId();
          }}
          variant={"destructive"}>
          Reset Watched Box 🎬
        </Button>
      )}
      <Button onClick={() => setOnWatchedBox(!onWatchedBox)}>
        {onWatchedBox ? "Search Movies" : "Watched Movies"} 🎬
      </Button>
    </div>
  );
}
