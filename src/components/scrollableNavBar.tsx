import { getRoomName } from "../helpers/helpers.ts";
import EmblaCarousel from "./EmblaCarousel/js/EmblaCarousel.tsx";
import { EmblaOptionsType } from "embla-carousel";
import { twMerge } from "tailwind-merge";
import { Room } from "../types/types.ts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store/store.ts";
import DynamicIcon from "./DynamicIcon.tsx";

interface ScrollableNavBarProps {
  onRoomSelect: (room: Room) => void;
}

export const ScrollableNavBar: React.FC<ScrollableNavBarProps> = ({
  onRoomSelect,
}) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const OPTIONS: EmblaOptionsType = { dragFree: true };
  const roomNames = Object.values(Room);
  const room = useSelector((state: AppState) => state.app.room);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(room);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedRoom(room);
    setDropdownOpen(false);
  }, [room]);

  const handleClick = (thisRoom: Room) => {
    setSelectedRoom(thisRoom);
    onRoomSelect(thisRoom);
  };

  const ROOM_SLIDES = roomNames.map((thisRoom, index) => (
    <button
      key={index}
      onClick={() => handleClick(thisRoom as Room)}
      className={twMerge(
        "cursor-pointer transition-colors duration-200 font-bold text-xs tracking-wide",
        selectedRoom === thisRoom ? "text-dark" : "text-uwu"
      )}
    >
      {getRoomName(thisRoom)}
    </button>
  ));

  return hasMicrointeractions ? (
    <EmblaCarousel slides={ROOM_SLIDES} options={OPTIONS} />
  ) : (
    <div className="dropdown w-full">
      <div
        tabIndex={0}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        role="button"
        className="w-full p-3 rounded-md border-2 border-uwu active:border-dark focus:border-dark font-bold hover:bg-inactive cursor-pointer"
      >
        <div className="flex flex-row items-center justify-between gap-2">
          {getRoomName(selectedRoom as Room)}
          <DynamicIcon iconName={"ChevronDown"} size={"20"} color="text-uwu" />
        </div>
      </div>
      {!dropdownOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-light rounded-sm z-1 p-2 shadow-lg mt-2 w-full border-2 border-uwu"
        >
          <li>
            {roomNames.map((thisRoom, index) => (
              <button
                key={index}
                onClick={() => (
                  handleClick(thisRoom as Room), setDropdownOpen(!dropdownOpen)
                )}
                className="transition-colors duration-200 font-bold text-xs tracking-wide hover:bg-inactive"
              >
                {getRoomName(thisRoom)}
              </button>
            ))}
          </li>
        </ul>
      )}
    </div>
  );
};
