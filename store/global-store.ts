import { create } from "zustand";
import { persist } from "zustand/middleware";

// movies
type MoviesState = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
};
export const useMovieStore = create<MoviesState>(set => ({
  movies: [],
  setMovies: (movies: Movie[]) => set({ movies: movies }),
}));

// query
type QueryState = {
  query: string;
  setQuery: (query: string) => void;
};
export const useQueryStore = create<QueryState>(set => ({
  query: "",
  setQuery: (query: string) => set({ query }),
}));

// loading
type LoadingState = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};
export const useLoadingStore = create<LoadingState>(set => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

// error
type ErrorState = {
  error: string;
  setError: (error: string) => void;
};
export const useErrorStore = create<ErrorState>(set => ({
  error: "",
  setError: (error: string) => set({ error }),
}));

// movie selection
type SelectedMovieState = {
  selectedMovieId: string | null;
  setSelectedMovieId: (id: string) => void;
  resetSelectedMovieId: () => void;
};
export const useSelectedMovieStore = create<SelectedMovieState>(set => ({
  selectedMovieId: null,
  setSelectedMovieId: (id: string) => set({ selectedMovieId: id }),
  resetSelectedMovieId: () => set({ selectedMovieId: null }),
}));

// userRating
type UserRatingState = {
  userRating: string;
  setUserRating: (userRating: string) => void;
};
export const useUserRatingStore = create<UserRatingState>(set => ({
  userRating: "",
  setUserRating: (UserRating: string) => set({ userRating: UserRating }),
}));

// watchedMovies
type WatchedMoviesState = {
  watchedMovies: WatchedMovie[] | [];
  addWatchedMovies: (watchedMovie: WatchedMovie) => void;
  removeWatchedMovies: (id: string) => void;
  resetWatchedMovies: () => void;
};
export const useWatchedMoviesStore = create(
  persist<WatchedMoviesState>(
    set => ({
      watchedMovies: [],
      addWatchedMovies: (watchedMovie: WatchedMovie) =>
        set(state => ({
          watchedMovies: state.watchedMovies.some(movie => watchedMovie.imdbID === movie.imdbID)
            ? state.watchedMovies
            : [...state.watchedMovies, watchedMovie],
        })),

      removeWatchedMovies: (id: string) =>
        set(state => ({
          watchedMovies: state.watchedMovies.filter(movie => movie.imdbID !== id),
        })),

      resetWatchedMovies: () => set({ watchedMovies: [] }),
    }),
    {
      name: "watchedMovies", // key for localStorage
    }
  )
);

// onWatchedMovies
type OnWatchedMoviesState = {
  onWatchedMovies: boolean;
  setOnWatchedMovies: (onWatchedMovies: boolean) => void;
};
export const useOnWatchedMoviesStore = create<OnWatchedMoviesState>(set => ({
  onWatchedMovies: false,
  setOnWatchedMovies: (onWatchedMovies: boolean) => set({ onWatchedMovies: onWatchedMovies }),
}));
