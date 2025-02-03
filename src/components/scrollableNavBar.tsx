import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const rooms = [
  "Wohnzimmer",
  "Schlafzimmer",
  "Küche",
  "Büro",
  "Garage",
  "Garten",
];

export default function ScrollableNavBar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const wrapper = document.querySelector(".scrollable-nav-bar");

      if (wrapper) {
        Draggable.create(containerRef.current, {
          type: "x",
          bounds: {
            minX: -wrapper.scrollWidth * 0.2,
            maxX: 0,
          },
          inertia: true,
          dragResistance: 0.1,
        });
      }
    }
  }, []);

  return (
    <div className="relative w-full flex items-center overflow-hidden">
      <div
        ref={containerRef}
        className="flex flex-row space-x-900 cursor-pointer"
      >
        {rooms.map((room, index) => (
          <div
            key={index}
            className="text-sidescroll-nav w-full hover:text-gray-600 transition-all nowrap"
          >
            {room}
          </div>
        ))}
      </div>
    </div>
  );
}
