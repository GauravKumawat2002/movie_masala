"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function Search({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (arg: string) => void;
}) {
  const [inputValue, setInputValue] = useState(query);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && setQuery(inputValue);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [query]);
  return (
    <Input
      className="w-2/3 focus-visible:!ring-opacity-50"
      type="text"
      ref={inputRef}
      placeholder="Search movies..."
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
