import { Category } from "../../types/dashboard.types";
import { useEffect, useRef, useState } from "react";
import { CategoryWrapper } from "./UI/CategoryWrapper";
import { devices } from "../../data/data";
import { Room } from "../../types/types";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { twMerge } from "tailwind-merge";


interface RoomGridProps {
  selectedRoom: Room | null;
}

export const RoomGrid: React.FC<RoomGridProps> = ({ selectedRoom }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const room = useSelector((state: AppState) => state.app.room);
  const hasMicrointeractions = useSelector((state: AppState) => state.app.hasMicrointeractions);


  
    useEffect(() => {
      if (isLoaded) {
        
      setIsVisible(false);
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, hasMicrointeractions ? 500 : 0);
  
      return () => clearTimeout(timeout);

    } 
    else {
      setIsLoaded(true)
    } ;
    }, [room]);

  return (
    <div
      ref={canvasRef}
      className={twMerge(
        "w-full h-[500px] transition-all relative flex flex-col items-center justify-center duration-200 ",
         isVisible ? "opacity-100 scale-100" : "opacity-0 scale-70 translate-y-[50px]")

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
