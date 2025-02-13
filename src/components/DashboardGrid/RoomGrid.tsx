import { Category } from "../../types/dashboard.types";
import { useRef } from "react";
import { CategoryWrapper } from "./UI/CategoryWrapper";

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
          <CategoryWrapper
            key={index}
            index={index}
            canvasRef={canvasRef}
            thisCategory={cat as Category}
          />
        ))}
    </div>
  );
};
