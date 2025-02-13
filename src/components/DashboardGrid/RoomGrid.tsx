import { Category } from "../../types/dashboard.types";
import { useRef } from "react";
import { CategoryBox } from "./CategoryGrid";

export const RoomGrid = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={canvasRef}
      className={
        "w-full h-[600px] transition-all relative flex flex-col items-center justify-center"
      }
    >
      {Object.values(Category)
        .filter((key) => isNaN(Number(key)))
        .map((cat, index) => (
          <CategoryBox
            key={index}
            index={index}
            canvasRef={canvasRef}
            thisCategory={cat as Category}
          />
        ))}
    </div>
  );
};
