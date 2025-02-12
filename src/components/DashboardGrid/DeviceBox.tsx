import { useState } from "react";
import { motion } from "framer-motion";
import DynamicIcon from "../DynamicIcon";
import { AppState } from "../../store/store";
import { useSelector } from "react-redux";
import { Device } from "../../types/types";
import { getColor } from "../../helpers/helpers";

interface DeviceProps {
  device: Device;
}

const onActiveAnimationBox = {
  initial: { scale: 1 },
  transition: { duration: 0.3, easing: "ease" },
};

export const DeviceBox = ({ device }: DeviceProps) => {
  const [isBoxActive, setIsBoxActive] = useState(device.isActive);
  const [isToggleOn, setIsToggleOn] = useState(device.isActive);
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const toggleActiveState = () => {
    setIsBoxActive((prev) => !prev);
  };

  const toggleButtonState = () => {
    setIsToggleOn((prev) => !prev);
  };

  return (
    <motion.div
      onClick={toggleActiveState}
      initial={hasMicrointeractions ? onActiveAnimationBox.initial : undefined}
      transition={
        hasMicrointeractions ? onActiveAnimationBox.transition : undefined
      }
      animate={
        hasMicrointeractions && isBoxActive
          ? { scale: [1, 1.05, 1] }
          : { scale: 1 }
      }
      className={`relative flex justify-start min-w-32 h-32 items-end px-4"
       font-bold gap-400 rounded-md select-none ${
         isBoxActive ? "shadow-active bg-light" : "bg-inactive"
       }`}
    >
      <input
        onClick={(e) => {
          e.stopPropagation();
          toggleButtonState();
          toggleActiveState();
        }}
        type="checkbox"
        className="absolute toggle toggle-lg rounded-full before:rounded-full top-600 border-none right-600 text-light bg-uwu checked:bg-green"
        defaultChecked={isToggleOn}
      />
      <div
        className={`absolute top-600 left-600" : ""
         text-light p-400 rounded-full ${
           isBoxActive ? getColor(device.category) : "bg-dark"
         }`}
      >
        <DynamicIcon iconName={device.icon} />
      </div>
      <div
        className={
          device.additionalInfo
            ? "flex flex-col items-start justify-start gap-0"
            : ""
        }
      >
        <span>{device.name}</span>
        {device.additionalInfo ? (
          <div className="text-meta">{device.additionalInfo}</div>
        ) : null}
      </div>
    </motion.div>
  );
};
