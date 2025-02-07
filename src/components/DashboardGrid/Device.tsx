import { useState } from "react";
import { motion } from "framer-motion";
import DynamicIcon from "../DynamicIcon";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface DeviceProps {
  deviceName: string;
  icon: string;
  activeColor?: string;
  hasAdditionalInfo?: boolean;
  additionalInfo?: string;
  hasToggle?: boolean;
  isActive?: boolean;
}

const onActiveAnimationBox = {
  initial: { scale: 1 },
  transition: { duration: 0.3, easing: "ease" },
};

export const Device = ({
  deviceName = "Placeholder",
  icon = "FaSmile",
  activeColor = "bg-yellow",
  hasAdditionalInfo = false,
  additionalInfo = "Additional Info",
  hasToggle = false,
  isActive = false,
}: DeviceProps) => {
  const [isBoxActive, setIsBoxActive] = useState(isActive);
  const [isToggleOn, setIsToggleOn] = useState(isActive);
  const hasMicrointeractions = useSelector(
    (state: RootState) => state.app.hasMicrointeractions
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
      className={`relative flex justify-start min-w-32 ${
        hasToggle
          ? "h-32 items-end py-600 px-600"
          : "items-center py-400 px-600 cursor-pointer"
      } font-bold gap-400 rounded-md select-none ${
        isBoxActive ? "shadow-active bg-light" : "bg-inactive"
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
        } text-light p-400 rounded-full ${
          isBoxActive ? activeColor : "bg-dark"
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
