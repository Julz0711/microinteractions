import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ScrolldownProps {
  items: string[];
  color: string;
  onSelect: (item: string) => void;
}

export default function Scrolldown({
  items,
  color,
  onSelect,
}: ScrolldownProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle item click (selecting an item)
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    onSelect(items[index]);
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="carousel carousel-vertical rounded-box h-32 w-full border-2 border-dark">
        {items.map((item, index) => (
          <div
            key={index}
            className={twMerge(
              "carousel-item h-2/5 flex flex-col items-center justify-center cursor-pointer",
              activeIndex === index
                ? twMerge(color, "font-bold text-light")
                : "bg-inactive"
            )}
            onClick={() => handleItemClick(index)} // Handle click to select item
          >
            <div className="text-lg">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
