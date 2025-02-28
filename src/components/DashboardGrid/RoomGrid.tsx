import { Category, HierarchyStep } from "../../types/dashboard.types";
import { useEffect, useRef, useState } from "react";
import { CategoryWrapper } from "./UI/CategoryWrapper";
import { devices } from "../../data/data";
import { Room } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { twMerge } from "tailwind-merge";
import { setRoom, setHierarchy, setCategory } from "../../store/reducer";

interface RoomGridProps {
  isRoomChanging: boolean;
  nextRoom: Room;
}

export const RoomGrid: React.FC<RoomGridProps> = ({
  isRoomChanging,
  nextRoom,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  useEffect(() => {
    return () => {
      dispatch(setHierarchy(HierarchyStep.SmartHomeGrid));
    };
  });

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(false);
      const timeout = setTimeout(
        () => {
          setIsVisible(true);
          dispatch(setRoom(nextRoom));
          dispatch(setHierarchy(HierarchyStep.SmartHomeGrid));
          dispatch(setCategory(null));
        },
        hasMicrointeractions ? 300 : 0
      );

      return () => clearTimeout(timeout);
    } else {
      setIsLoaded(true);
    }
  }, [isRoomChanging, nextRoom]);

  return (
    <div
      ref={canvasRef}
      className={twMerge(
        "w-full h-[530px] transition-all relative flex flex-col items-center justify-center duration-200 ",
        isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-70 translate-y-[50px]"
      )}
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
