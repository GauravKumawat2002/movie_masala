export default function NumResult({ movies }: { movies: Movie[] }) {
  return (
    <p className="text-primary text-sm md:text-base ">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
