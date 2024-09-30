import { create } from "zustand";
import { persist } from "zustand/middleware";

// query
type QueryState = {
  query: string;
  setQuery: (query: string) => void;
};
export const useQueryStore = create<QueryState>((set) => ({
  query: "",
  setQuery: (query: string) => set({ query }),
}));

// userRating
type UserRatingState = {
  userRating: string;
  setUserRating: (userRating: string) => void;
};
export const useUserRatingStore = create<UserRatingState>((set) => ({
  userRating: "",
  setUserRating: (UserRating: string) => set({ userRating: UserRating }),
}));

// movies
type MoviesState = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
};
export const useMovieStore = create<MoviesState>((set) => ({
  movies: [],
  setMovies: (movies: Movie[]) => set({ movies: movies }),
}));

// selectedMovie
type SelectedMovieState = {
  selectedMovie: SelectedMovie | object;
  setSelectedMovie: (selectedMovie: SelectedMovie | object) => void;
};
export const useSelectedMovieStore = create<SelectedMovieState>((set) => ({
  selectedMovie: {},
  setSelectedMovie: (selectedMovie: SelectedMovie | object) =>
    set({ selectedMovie }),
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
    (set) => ({
      watchedMovies: [],
      addWatchedMovies: (watchedMovie: WatchedMovie) =>
        set((state) => ({
          watchedMovies: state.watchedMovies.some(
            (movie) => watchedMovie.imdbID === movie.imdbID,
          )
            ? state.watchedMovies
            : [...state.watchedMovies, watchedMovie],
        })),

      removeWatchedMovies: (id: string) =>
        set((state) => ({
          watchedMovies: state.watchedMovies.filter(
            (movie) => movie.imdbID !== id,
          ),
        })),

      resetWatchedMovies: () => set({ watchedMovies: [] }),
    }),
    {
      name: "watchedMovies", // key for localStorage
    },
  ),
);
