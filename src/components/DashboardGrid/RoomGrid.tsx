import { Category } from "../../types/dashboard.types";
import { useRef } from "react";
import { CategoryWrapper } from "./UI/CategoryWrapper";
import { devices } from "../../data/data";
import { Room } from "../../types/types";

interface RoomGridProps {
  selectedRoom: Room | null;
}

export const RoomGrid: React.FC<RoomGridProps> = ({ selectedRoom }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const filteredDevices = devices.filter(
    (device) => device.room === selectedRoom
  );

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
