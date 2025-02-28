import DynamicIcon from "./DynamicIcon";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { Device, Room } from "../types/types";
import { getColor, getRoomName, getTextColor } from "../helpers/helpers";
import Lottie from "react-lottie";
import toggleLottie from "../assets/lottie/toggle_v4.json";
import { twMerge } from "tailwind-merge";

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
  const [isBoxActive, setIsBoxActive] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);

  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  useEffect(() => {
    setIsBoxActive(device.isActive);
    setIsToggleOn(device.isActive);
  }, [device.isActive]);

  useEffect(() => {
    setAnimationDirection(isBoxActive ? 1 : -1);
  }, [isBoxActive]);

  /* Text Overflow */
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const parent = textRef.current.parentElement;
        if (parent) {
          const textW = textRef.current.scrollWidth;
          const parentW = parent.clientWidth;
          setTextWidth(textW);
          setParentWidth(parentW);
          setIsOverflowing(textW > parentW);
        }
      }
    };

    const timeout = setTimeout(checkOverflow, 100);

    window.addEventListener("resize", checkOverflow);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [device.name]);

  const toggleActiveState = () => {
    setIsBoxActive((prev) => !prev);
    setHasInteracted(true);
  };

  const toggleButtonState = () => {
    setIsToggleOn((prev) => !prev);
    setHasInteracted(true);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleButtonState();
    toggleActiveState();
  };

  return (
    <motion.div
      onClick={!hasToggle ? toggleActiveState : undefined}
      initial={hasMicrointeractions ? onActiveAnimationBox.initial : undefined}
      transition={
        hasMicrointeractions ? onActiveAnimationBox.transition : undefined
      }
      animate={
        hasMicrointeractions && isBoxActive && hasInteracted
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
          : "items-center pl-3 pr-4 py-3 cursor-pointer gap-2"
      } font-bold rounded-md select-none ${
        hasMicrointeractions
          ? isBoxActive
            ? "device-box-active"
            : "device-box-inactive"
          : ""
      } ${isBoxActive ? "shadow-active bg-light" : "bg-inactive"}`}
    >
      {hasToggle && (
        <div>
          {hasMicrointeractions ? (
            <div
              className="absolute top-4 right-3 cursor-pointer"
              onClick={handleToggleClick}
            >
              <Lottie
                options={{
                  loop: false,
                  autoplay: false,
                  animationData: toggleLottie,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={30}
                width={65}
                speed={2.2}
                direction={animationDirection}
              />
            </div>
          ) : (
            <input
              onClick={handleToggleClick}
              type="checkbox"
              className={`absolute toggle ${
                isSmall ? "toggle-md" : "toggle-lg"
              } rounded-full before:rounded-full top-4 border-none right-3 text-light bg-uwu checked:bg-green`}
              defaultChecked={isToggleOn}
            />
          )}
        </div>
      )}
      <div
        className={`${
          hasToggle
            ? isBoxActive
              ? twMerge("absolute top-3 left-3 p-2", getColor(device.category))
              : "absolute top-3 left-3 p-2 bg-dark"
            : ""
        } text-light rounded-full`}
      >
        <div className="z-90">
          <DynamicIcon
            iconName={device.icon}
            color={
              hasToggle
                ? "text-light"
                : isBoxActive
                ? getTextColor(device.category)
                : "text-black"
            }
            size={isSmall ? "16" : "25"}
          />
        </div>
      </div>

      <div
        className={
          device.additionalInfo
            ? "z-20 flex flex-col items-start justify-start w-full gap-0"
            : ""
        }
      >
        <div className="relative w-full overflow-hidden">
          <motion.span
            ref={hasMicrointeractions ? textRef : undefined}
            className="block whitespace-nowrap"
            animate={
              isOverflowing
                ? { x: ["0px", `${-(textWidth - parentWidth)}px`, "0px"] }
                : { x: "0px" }
            }
            transition={
              isOverflowing
                ? {
                    repeat: Infinity,
                    duration: 6,
                    ease: "linear",
                    times: [0, 0.45, 1],
                  }
                : undefined
            }
            whileHover={{ x: "0%", transition: { duration: 0.5 } }}
          >
            <span className="text-xs"> {device.name} </span>
          </motion.span>
        </div>

        <div className="flex flex-row gap-1 items-center font-normal">
          {device.additionalInfo ? (
            <div
              className={`text-uwu ${isSmall ? "text-[0.65rem]" : "text-xs"}`}
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
              className={`text-uwu font-normal flex flex-row gap-1 items-center ${
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
