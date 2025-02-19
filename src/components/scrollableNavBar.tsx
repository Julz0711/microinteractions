import { getAllRoomNames, getRoomName } from "../helpers/helpers";
import EmblaCarousel from "../components/EmblaCarousel/js/EmblaCarousel.tsx";
import { EmblaOptionsType } from "embla-carousel";
import { twMerge } from "tailwind-merge";
import { Room } from "../types/types.ts";
import { useEffect } from "react";

interface ScrollableNavBarProps {
  selectedRoom: Room | null;
  onRoomSelect: (room: Room | null) => void;
}

export const ScrollableNavBar: React.FC<ScrollableNavBarProps> = ({
  selectedRoom,
  onRoomSelect,
}) => {
  const OPTIONS: EmblaOptionsType = { dragFree: true };
  const roomNames = Object.values(Room);
  const defaultRoom = roomNames.length > 0 ? (roomNames[0] as Room) : null;

  useEffect(() => {
    if (!selectedRoom && defaultRoom) {
      onRoomSelect(defaultRoom);
    }
  }, [selectedRoom, defaultRoom, onRoomSelect]);

  const ROOM_SLIDES = roomNames.map((room, index) => (
    <button
      key={index}
      onClick={() => onRoomSelect(room as Room)}
      className={twMerge(
        "cursor-pointer transition-colors duration-200 font-bold",
        selectedRoom === (room as Room) ? "text-dark" : "text-uwu"
      )}
    >
      {getRoomName(room)}
    </button>
  ));

  return <EmblaCarousel slides={ROOM_SLIDES} options={OPTIONS} />;
};
