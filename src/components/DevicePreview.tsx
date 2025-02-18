import DynamicIcon from "./DynamicIcon";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { Device, Room } from "../types/types";
import { getColor, getRoomName } from "../helpers/helpers";

interface DeviceBoxProps {
  device: Device;
  hasToggle?: boolean;
  hasRoomName?: boolean;
  isSmall?: boolean;
}

const onActiveAnimationBox = {
  initial: { scale: 1 },
  transition: { duration: 0.4, easing: "ease" },
};

const DevicePreview = ({
  device,
  hasToggle,
  hasRoomName,
  isSmall,
}: DeviceBoxProps) => {
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
          ? isSmall
            ? "h-24 items-end py-2 px-2"
            : "h-32 items-end py-4 px-4"
          : isSmall
          ? "items-center pl-2 pr-3 py-2 cursor-pointer gap-2"
          : "items-center pl-3 pr-4 py-3 cursor-pointer gap-3"
      } font-bold rounded-md select-none ${
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
          className={`absolute toggle ${
            isSmall ? "toggle-md" : "toggle-lg"
          } rounded-full before:rounded-full top-4 border-none right-3 text-light bg-uwu checked:bg-green`}
          defaultChecked={isToggleOn}
        />
      )}
      <div
        className={`${
          hasToggle ? "absolute top-3 left-3" : ""
        } text-light rounded-full ${
          isBoxActive ? getColor(device.category) : "bg-dark"
        } ${isSmall ? "p-1" : "p-2"}`}
      >
        <div className="z-90">
          <DynamicIcon
            iconName={device.icon}
            color="text-light"
            size={isSmall ? "15" : "20"}
          />
        </div>
      </div>

      <div
        className={
          device.additionalInfo
            ? "z-20 flex flex-col items-start justify-start gap-0"
            : ""
        }
      >
        <span className={isSmall ? "text-sm" : "text-base"}>{device.name}</span>
        <div className="flex flex-row gap-1 items-center">
          {device.additionalInfo ? (
            <div
              className={`text-uwu font-bold ${
                isSmall ? "text-[0.65rem]" : "text-xs"
              }`}
            >
              {isBoxActive
                ? device.additionalInfo.length > 0
                  ? device.additionalInfo
                  : "Aus"
                : "Aus"}
            </div>
          ) : null}
          {hasRoomName && (
            <div
              className={`text-meta flex flex-row gap-1 items-center ${
                isSmall ? "text-[0.65rem]" : "text-xs"
              }`}
            >
              <span>•</span>
              <div>{device.room ? getRoomName(device.room as Room) : ""}</div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DevicePreview;
