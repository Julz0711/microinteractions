import DynamicIcon from "./dynamicIcon";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMicrointeractionContext } from "../context/MicrointeractionContext";

interface DeviceBoxProps {
  deviceName: string;
  icon: string;
  activeColor?: string;
  hasAdditionalInfo?: boolean;
  additionalInfo?: string;
  hasToggle?: boolean;
}

const onActiveAnimationBox = {
  initial: { scale: 1 },
  transition: { duration: 0.3, easing: "ease" },
};

const DeviceBox: React.FC<DeviceBoxProps> = ({
  deviceName = "Placeholder",
  icon = "FaSmile",
  activeColor = "bg-yellow",
  hasAdditionalInfo = false,
  additionalInfo = "Additional Info",
  hasToggle = false,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const { hasMicrointeractions } = useMicrointeractionContext();

  const toggleActiveState = () => {
    setIsActive((prev) => !prev);
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
        hasMicrointeractions && isActive
          ? { scale: [1, 1.05, 1] }
          : { scale: 1 }
      }
      className={`relative flex justify-center ${
        hasToggle
          ? "h-32 items-end py-600 px-600"
          : "items-center py-400 px-600 cursor-pointer"
      } font-bold gap-400 rounded-md select-none ${
        isActive ? "shadow-active bg-light" : "bg-inactive"
      }`}
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
          hasToggle ? "absolute top-600 left-600" : ""
        } text-light p-400 rounded-full ${isActive ? activeColor : "bg-dark"}`}
      >
        <DynamicIcon iconName={icon} />
      </div>
      <div
        className={
          hasAdditionalInfo
            ? "flex flex-col items-start justify-start gap-0"
            : ""
        }
      >
        <span>{deviceName}</span>
        {hasAdditionalInfo ? (
          <div className="text-meta">{additionalInfo}</div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default DeviceBox;
