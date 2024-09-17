declare global {
  interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  }
  interface WatchedMovie extends Movie {
    runtime: string;
    imdbRating: string;
    userRating: string;
  }
  interface SelectedMovie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string; // need to split it fromm commas into array
    Plot: string;
    language: string; // need to split it fromm commas into array
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: { Source: string; Value: string }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
  }
}
