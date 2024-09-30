import { useQuery } from "@tanstack/react-query";

async function fetchMovies({
  queryKey,
}: {
  queryKey: [string, { url: string }];
}): Promise<Movie[] | Movie> {
  const [_key, { url }] = queryKey;
  const response = await fetch(url, { method: "GET" });
  if (!response.ok) throw new Error("Failed to fetch Movies");
  const data = await response.json();
  if (data.Response === "False") throw new Error(data.Error);
  if (data.Search) {
    const result = data.Search as Movie[];
    return result;
  } else {
    const result = data as Movie;
    return result;
  }
}
export default function useFetchMovies({ url }: { url: string }) {
  const {
    data: movies,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["movies", { url }],
    queryFn: fetchMovies,
    enabled: !!url,
  });
  return { movies, isLoading, error, isSuccess };
}
