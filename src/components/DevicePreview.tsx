import DynamicIcon from "./DynamicIcon";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { Device } from "../types/types";
import { getColor } from "../helpers/helpers";

interface DeviceBoxProps {
  device: Device;
  hasToggle?: boolean;
}

const onActiveAnimationBox = {
  initial: { scale: 1 },
  transition: { duration: 0.4, easing: "ease" },
};

const DevicePreview = ({ device, hasToggle }: DeviceBoxProps) => {
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
      onClick={!hasToggle ? toggleActiveState : undefined}
      initial={hasMicrointeractions ? onActiveAnimationBox.initial : undefined}
      transition={
        hasMicrointeractions ? onActiveAnimationBox.transition : undefined
      }
      animate={
        hasMicrointeractions && isBoxActive
          ? { scale: [1, 1.05, 1] }
          : { scale: 1 }
      }
      className={`relative flex justify-start min-w-32 overflow-hidden ${
        hasToggle
          ? "h-32 items-end py-600 px-600"
          : "items-center py-400 px-600 cursor-pointer"
      } font-bold gap-400 rounded-md select-none ${
        hasMicrointeractions
          ? isBoxActive
            ? "device-box-active"
            : "device-box-inactive"
          : ""
      } ${isBoxActive ? "shadow-active bg-light" : "bg-inactive"}`}
    >
      {hasToggle && (
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
          hasToggle ? "absolute top-600 left-600 p-1" : ""
        } text-light rounded-full ${
          isBoxActive ? getColor(device.category) : "bg-dark"
        }`}
      >
        <div className="z-90 p-1">
          <DynamicIcon iconName={"Bluetooth"} color="text-light" size={"16"} />
        </div>
      </div>

      <div
        className={
          device.additionalInfo
            ? "z-20 flex flex-col items-start justify-start gap-0"
            : ""
        }
      >
        <span>{device.name}</span>
        <div>
          {device.additionalInfo ? (
            <div className="text-meta">
              {isBoxActive
                ? device.additionalInfo.length > 0
                  ? device.additionalInfo
                  : "Aus"
                : "Aus"}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default DevicePreview;
