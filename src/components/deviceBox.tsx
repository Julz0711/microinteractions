import DynamicIcon from "./dynamicIcon";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface DeviceBoxProps {
  deviceName: string;
  icon: string;
  activeColor?: string;
  hasAdditionalInfo?: boolean;
  additionalInfo?: string;
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
}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveState = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <motion.div
      onClick={toggleActiveState}
      initial={onActiveAnimationBox.initial}
      transition={onActiveAnimationBox.transition}
      animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      className={`flex-center font-bold gap-400 py-400 px-600 shadow-active rounded-md cursor-pointer select-none ${
        isActive ? "bg-light" : "bg-inactive"
      }`}
    >
      <div
        className={`p-400 rounded-full text-light text-lg ${
          isActive ? activeColor : "bg-dark"
        }`}
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
