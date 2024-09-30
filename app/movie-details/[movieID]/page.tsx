"use client";
import MovieDetailsCard from "@/components/custom/shared/movie-detail-card";
import { useParams } from "next/navigation";

export default function MovieDetailsPage() {
  const parameter = useParams().movieID;
  return (
    <MovieDetailsCard
      className="mb-16 mt-3 pl-4"
      parameter={parameter as string}
    />
  );
}
