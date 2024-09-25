"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useQueryStore } from "@/store/global-store";
export default function Search() {
  const query = useQueryStore(state => state.query);
  const setQuery = useQueryStore(state => state.setQuery);
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
