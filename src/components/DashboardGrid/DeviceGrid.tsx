import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { AppState } from "../../store/store";
import { useEffect, useState } from "react";
import { Category } from "../../types/dashboard.types";
import { devices } from "../../data/data";
import { motion } from "framer-motion";
import { option } from "framer-motion/client";
import { DeviceBox } from "./DeviceBox";

export interface DeviceGridProps {
  activeAnimationFinished: boolean;
}

export const DeviceGrid = (props: DeviceGridProps) => {
  const { category } = useSelector((state: AppState) => state.app);
  const [buttonColorClass, setbuttonColorClass] = useState("");
  const [active, setActive] = useState(false);
  const filteredDevices = devices.filter(
    (device) => device.category === category
  );

  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  useEffect(() => {
    switch (category) {
      case Category.Lights:
        setbuttonColorClass("bg-orange");
        break;
      case Category.Entertainment:
        setbuttonColorClass("bg-purple");
        break;
      case Category.Heat:
        setbuttonColorClass("bg-red");
        break;
      case Category.Air:
        setbuttonColorClass("bg-green");
        break;
    }
  }, [category]);

  const buttonVariants = {
    hidden: (index: number) => ({
      scaleX: 0,
      scaleY: 0,
      y: 180 - Math.floor(index / 2) * 60,
      x: 80 - (index % 2) * 160,
    }),
    visible: (index: number) => ({
      scaleX: 1,
      scaleY: 1,
      y: -10,
      x: 0,
      transition: {
        duration: hasMicrointeractions ? 0.2 : 0,
        ease: "easeOut",
        delay: index * 0.05,
      },
    }),
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 absolute w-80 left-1/2 bottom-24 -translate-x-1/2 -z-10">
        {filteredDevices.map((device, index) => (
          <motion.button
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <DeviceBox device={device} />
          </motion.button>
        ))}
      </div>
    </>
  );
};
