"use client";
import { useEffect, useState } from "react";
import ListBox from "@/components/custom/listbox/list-box";
import { ModeToggle } from "@/components/custom/navbar/mode-toggle";
import Navbar from "@/components/custom/navbar/nav-bar";
import NumResult from "@/components/custom/navbar/num-results";
import Container from "@/components/custom/shared/container";
import Search from "@/components/custom/navbar/search";

export default function Home() {
  const KEY = "f9a2e728";
  const [selected, setSelected] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, isLoading] = useState(false);
  const [query, setQuery] = useState<string>("");

  // fetch movies
  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      isLoading(true);
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=tt1375666&apikey=${KEY}&s=${query}`,
          { signal: controller.signal, method: "GET" }
        );

        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();

        if (data.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
      } finally {
        isLoading(false);
      }
    }

    if (!query.length) {
      setError("");
      setMovies([]);
      return;
    }

    fetchMovies();
    return () => {
      setError("");
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar className="mt-4 gap-4 md:gap-0">
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
        <ModeToggle />
      </Navbar>
      <Container>
        <ListBox className="mt-4 pr-4" handleSelected={setSelected} movies={movies} />
        <ListBox className="mt-4 pr-4" handleSelected={setSelected} movies={movies} />
      </Container>
    </>
  );
}
