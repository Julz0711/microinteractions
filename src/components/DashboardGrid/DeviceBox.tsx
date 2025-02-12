import { useState } from "react";
import { motion } from "framer-motion";
import DynamicIcon from "../DynamicIcon";
import { AppState } from "../../store/store";
import { useSelector } from "react-redux";
import { Device } from "../../types/types";

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
      onClick={!device.hasToggle ? toggleActiveState : undefined}
      initial={hasMicrointeractions ? onActiveAnimationBox.initial : undefined}
      transition={
        hasMicrointeractions ? onActiveAnimationBox.transition : undefined
      }
      animate={
        hasMicrointeractions && isBoxActive
          ? { scale: [1, 1.05, 1] }
          : { scale: 1 }
      }
      className={`relative flex justify-start min-w-32 ${
        device.hasToggle
          ? "h-32 items-end py-600 px-600"
          : "items-center py-400 px-600 cursor-pointer"
      } font-bold gap-400 rounded-md select-none ${
        isBoxActive ? "shadow-active bg-light" : "bg-inactive"
      }`}
    >
      {device.hasToggle && (
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
      )}
      <div
        className={`${
          device.hasToggle ? "absolute top-600 left-600" : ""
        } text-light p-400 rounded-full ${
          isBoxActive ? device.activeColor : "bg-dark"
        }`}
      >
        <DynamicIcon iconName={device.icon} />
      </div>
      <div
        className={
          device.hasAdditionalInfo
            ? "flex flex-col items-start justify-start gap-0"
            : ""
        }
      >
        <span>{device.deviceName}</span>
        {device.hasAdditionalInfo ? (
          <div className="text-meta">{device.additionalInfo}</div>
        ) : null}
      </div>
    </motion.div>
  );
};
