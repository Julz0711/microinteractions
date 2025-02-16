import { getAllRoomNames } from "../helpers/helpers";
import EmblaCarousel from "../components/EmblaCarousel/js/EmblaCarousel.tsx";
import { EmblaOptionsType } from "embla-carousel";
import { twMerge } from "tailwind-merge";

export default function ScrollableNavBar() {
  const OPTIONS: EmblaOptionsType = { dragFree: true };
  const ROOM_SLIDES = getAllRoomNames().map((room, index) => (
    <button
      key={index}
      onClick={() => console.log(room)}
      className={twMerge("text-uwu cursor-pointer")}
    >
      {room}
    </button>
  ));

  return <EmblaCarousel slides={ROOM_SLIDES} options={OPTIONS} />;
}
