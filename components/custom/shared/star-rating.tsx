import { useEffect, useState } from "react";
import { Star, StarIcon } from "lucide-react";
export default function StarRating({
  numStars,
  defaultRating = 0,
  setExternalRating,
  messages = [],
  color = "#fcc419",
}: {
  numStars: number;
  defaultRating?: number;
  setExternalRating?: (index: number) => void;
  messages?: string[];
  color?: string;
}) {
  const [rating, setRating] = useState<number>(defaultRating);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setHover(rating);
    setExternalRating && setExternalRating(rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);
  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        gap: ".2em",
      }}>
      {Array.from({ length: numStars }, (_, index) => (
        <li
          onMouseOver={() => (
            setHover(index + 1), setExternalRating && setExternalRating(index + 1)
          )}
          onMouseLeave={() => (setHover(rating), setExternalRating && setExternalRating(rating))}
          onClick={() => (setRating(index + 1), setExternalRating && setExternalRating(index + 1))}
          onKeyDown={event => {
            if (event.key === "Enter" || event.key === " ") {
              setRating(index + 1);
              setHover(rating);
            }
          }}
          style={{ cursor: "pointer" }}
          key={index}
          tabIndex={0}>
          {index + 1 <= (hover ?? rating) ? <StarIcon color={color} /> : <Star color={color} />}
        </li>
      ))}
      <p style={{ color: `${color}` }}>
        {messages.length === numStars
          ? messages[hover ? hover - 1 : rating - 1]
          : hover === 0
          ? "0"
          : hover}
      </p>
    </ul>
  );
}
