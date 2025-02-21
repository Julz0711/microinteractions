import { getRoomName } from "../helpers/helpers";
import EmblaCarousel from "../components/EmblaCarousel/js/EmblaCarousel.tsx";
import { EmblaOptionsType } from "embla-carousel";
import { twMerge } from "tailwind-merge";
import { Room } from "../types/types.ts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store/store.ts";

interface ScrollableNavBarProps {
  onRoomSelect: (room: Room) => void;
}

export const ScrollableNavBar: React.FC<ScrollableNavBarProps> = ({
  onRoomSelect,
}) => {
  const OPTIONS: EmblaOptionsType = { dragFree: true };
  const roomNames = Object.values(Room);
  const defaultRoom = roomNames.length > 0 ? (roomNames[0] as Room) : null;
  const room = useSelector((state: AppState) => state.app.room);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(defaultRoom);

  useEffect(() => {
    if (!room && defaultRoom) {
      onRoomSelect(defaultRoom);
      setSelectedRoom(defaultRoom);
    }
  }, [room, defaultRoom, onRoomSelect]);

  const handleClick = (thisRoom: Room) => {
    setSelectedRoom(thisRoom);
    onRoomSelect(thisRoom);
  };

  const ROOM_SLIDES = roomNames.map((thisRoom, index) => (
    <button
      key={index}
      onClick={() => handleClick(thisRoom as Room)}
      className={twMerge(
        "cursor-pointer transition-colors duration-200 font-bold",
        selectedRoom === thisRoom ? "text-dark" : "text-uwu"
      )}
    >
      {getRoomName(thisRoom)}
    </button>
  ));

  return <EmblaCarousel slides={ROOM_SLIDES} options={OPTIONS} />;
};
