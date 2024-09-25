"use client";
import { useMovieStore, useQueryStore } from "@/store/global-store";
import { ModeToggle } from "@/components/custom/navbar/mode-toggle";
import Navbar from "@/components/custom/navbar/nav-bar";
import NumResult from "@/components/custom/navbar/num-results";
import Search from "@/components/custom/navbar/search";
import Container from "@/components/custom/shared/container";
import ListBox from "@/components/custom/listbox/list-box";

import MovieDetailsCard from "@/components/custom/shared/movie-detail-card";

export default function Home() {
  const query = useQueryStore(state => state.query);
  const movies = useMovieStore(state => state.movies);

  return (
    <>
      <Navbar className="mt-4 gap-4 md:gap-0">
        <Search />
        {movies && <NumResult movies={movies} />}
        <ModeToggle />
      </Navbar>
      <Container>
        <ListBox className="mt-4 pr-4 w-1/2" query={query} />
        <MovieDetailsCard className="mt-4 pl-4 w-1/2" />
      </Container>
    </>
  );
}
