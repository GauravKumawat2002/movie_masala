import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
export default function MovieCard({
  movie,
  handleSelected,
}: {
  movie: Movie;
  handleSelected: (id: string) => void;
}) {
  return (
    <li onClick={() => handleSelected(movie.imdbID)}>
      <Card className="justify-between">
        <CardHeader>
          <Image
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            width={150}
            height={200}
            className="aspect-auto h-[200px]"
          />
          <CardTitle className="text-balance">{movie.Title} </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </CardDescription>
        </CardContent>
      </Card>
    </li>
  );
}
