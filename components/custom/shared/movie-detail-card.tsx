import { useEffect, useState } from "react";

import StarRating from "@/components/custom/shared/star-rating";

// MovieDetails component
export default function MovieDetails({
  selectedMovieId,
  onCloseMovie,
  onAddWatched, // handleAddWatched function will be passed as a prop to the MovieDetails component in this prop
  watched,
}: {
  selectedMovieId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedMovie) => void;
  watched: WatchedMovie[];
}) {
  // State variables
  const [selectedMovie, setSelectedMovie] = useState<SelectedMovie | {}>({});
  const [userRating, setUserRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if the selected movie is already in the watched list
  const isWatched = watched.map(movie => movie.imdbID).includes(selectedMovieId);

  // Get the user rating of the selected movie
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedMovieId)?.userRating;

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
        if (selectedMovieId) document.title = `🍿 ${data.Title}`;
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
      document.title = "🍿 usePopcorn";
    };
  }, [selectedMovieId]);

  // Close the movie details component when the user presses the escape key
  useEffect(() => {
    function closeMovieOnEsc(e: KeyboardEvent) {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    }

    document.addEventListener("keydown", closeMovieOnEsc);
    return () => document.removeEventListener("keydown", closeMovieOnEsc);
  }, [selectedMovieId]);

  // Create a new watched movie object
  const newWatchedMovie: WatchedMovie = {
    imdbID: selectedMovieId,
    Poster: posters,
    Title: title,
    imdbRating: imdbRating,
    runtime: runtime,
    userRating: userRating,
    Year: released,
  };

  // Function to handle adding the movie to the watched list
  function handleWatched() {
    onAddWatched(newWatchedMovie);
  }

  // Function to handle setting the user rating
  const handleSetUserRating = (rating: number) => {
    setUserRating(rating.toString());
  };

  return (
    <div className="details">
      {loading && <h2 className="loader">Loading...</h2>}
      {!loading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={posters} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating numStars={10} setExternalRating={handleSetUserRating} />
                  {parseFloat(userRating) > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => {
                        handleWatched();
                        onCloseMovie();
                      }}>
                      Add to Watched
                    </button>
                  )}
                </>
              ) : (
                <p>You rated it {watchedUserRating} </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors} </p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <h2 className="error">{error}</h2>}
    </div>
  );
}
