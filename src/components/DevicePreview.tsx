import DynamicIcon from "./DynamicIcon";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { Device, Room } from "../types/types";
import { getColor, getRoomName, getTextColor } from "../helpers/helpers";
import Lottie from "react-lottie";
import toggleLottie from "../assets/lottie/toggle_v4.json";
import TrashBinAnimation from "../assets/lottie/TrashBinAnimation.json";
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
  const [, setHasInteracted] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

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

  const handleLongPressStart = () => {
    setIsLongPress(false);
    longPressTimeout.current = setTimeout(() => {
      if (isLongPress) {
        setShowModal(true);
        setIsModalVisible(true);
      }
    }, 300);

    controls.start({
      scale: 1.05,
      transition: { duration: 0.3 },
    });
  };

  const handleLongPressEnd = () => {
    setIsLongPress(true);
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }

    controls.start({
      scale: 1,
      transition: { duration: 0.3 },
    });
  };

  const handleSettingsButtonClick = () => {
    setShowModal(true);
    setConfirmDelete(false);
    setPlayAnimation(false);
    setIsModalVisible(true);
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(false);
    setPlayAnimation(true);
    setTimeout(() => {
      setIsModalVisible(false);
      setTimeout(() => {
        setShowModal(false);
        setPlayAnimation(false);
      }, 300);
    }, 1200);
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: TrashBinAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {}, [showModal]);

  const modalBtn =
    "font-bold text-dark text-lg hover:text-dark/70 cursor-pointer flex flex-row gap-2 items-center";

  return (
    <>
      <motion.div
        onClick={!hasToggle ? toggleActiveState : undefined}
        onMouseDown={hasMicrointeractions ? handleLongPressStart : undefined}
        onMouseUp={hasMicrointeractions ? handleLongPressEnd : undefined}
        onMouseLeave={hasMicrointeractions ? handleLongPressEnd : undefined}
        onTouchStart={hasMicrointeractions ? handleLongPressStart : undefined}
        onTouchEnd={hasMicrointeractions ? handleLongPressEnd : undefined}
        initial={
          hasMicrointeractions ? onActiveAnimationBox.initial : undefined
        }
        transition={
          hasMicrointeractions ? onActiveAnimationBox.transition : undefined
        }
        animate={controls}
        className={`relative flex justify-start min-w-32 overflow-hidden ${
          hasToggle
            ? isSmall
              ? "h-24 items-end py-2 px-2"
              : twMerge(
                  hasMicrointeractions ? "h-32" : "h-32",
                  "items-end py-4 px-4"
                )
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
                checked={isToggleOn}
              />
            )}
          </div>
        )}
        <div
          className={`${
            hasToggle
              ? isBoxActive
                ? twMerge(
                    "absolute top-3 left-3 p-2",
                    getColor(device.category)
                  )
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
          <div className="relative overflow-hidden">
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
              <span className="text-xs">{device.name}</span>
            </motion.span>
          </div>

          {device.additionalInfo ? (
            <div
              className={`text-uwu ${
                isSmall
                  ? "text-[0.65rem]"
                  : "text-xs flex gap-1 justify-between"
              }`}
            >
              {isBoxActive
                ? device.additionalInfo.length > 0
                  ? device.additionalInfo
                  : "Aus"
                : "Aus"}

              {hasToggle && (
                <button
                  className={twMerge(
                    isBoxActive ? "" : "text-dark",
                    "text-[1rem] flex flex-row items-center justify-between rounded-sm gap-1 cursor-pointer"
                  )}
                  onClick={() => {
                    setShowModal(true);
                    setIsModalVisible(true);
                  }}
                >
                  <DynamicIcon iconName={"Edit"} size={"16"} />
                </button>
              )}
              {hasRoomName && (
                <div
                  className={`text-uwu font-normal flex flex-row gap-1 items-center ${
                    isSmall ? "text-[0.65rem]" : "text-xs"
                  }`}
                >
                  <span>•</span>
                  <div>
                    {device.room ? getRoomName(device.room as Room) : ""}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </motion.div>

      {showModal && hasToggle && (
        <AnimatePresence>
          {isModalVisible && (
            <motion.div
              className={twMerge(
                "fixed inset-0 h-full w-full z-[9999999] flex flex-col gap-8 py-4 items-center justify-around bg-light/30 backdrop-blur-[20px]"
              )}
              initial={
                hasMicrointeractions ? { scale: 0, opacity: 0 } : undefined
              }
              animate={
                hasMicrointeractions ? { scale: 1, opacity: 1 } : undefined
              }
              exit={hasMicrointeractions ? { scale: 0, opacity: 0 } : undefined}
            >
              {playAnimation ? (
                <div className="flex items-center w-full">
                  <Lottie
                    options={defaultOptions}
                    speed={0.8}
                    height={270}
                    width={200}
                  />
                </div>
              ) : (
                <>
                  {confirmDelete ? (
                    <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
                      <div className="font-bold text-dark text-2xl flex flex-row gap-2 items-center">
                        <DynamicIcon iconName={"Trash"} size={"28"} />
                        Gerät löschen
                      </div>
                      <p className="w-4/5 text-center">
                        Bist du dir sicher, dass du dieses Gerät löschen
                        möchtest? Dieser Vorgang kann nicht rückgängig gemacht
                        werden.{" "}
                      </p>
                      <div className="flex gap-4 mt-2">
                        <button
                          onClick={() => setConfirmDelete(false)}
                          className="btn-sm-alt"
                        >
                          Abbrechen
                        </button>
                        <button
                          onClick={
                            hasMicrointeractions
                              ? handleConfirmDelete
                              : () => {
                                  setShowModal(false);
                                  setIsModalVisible(false);
                                  setConfirmDelete(false);
                                }
                          }
                          className="btn-sm"
                        >
                          Ja, ich bin mir sicher!
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={twMerge("flex flex-col gap-4 items-center")}
                      >
                        <div
                          className={twMerge(
                            getColor(device.category),
                            "p-4 rounded-full"
                          )}
                        >
                          <DynamicIcon
                            iconName={device.icon}
                            color="text-white"
                          />
                        </div>
                        <span className="font-bold text-dark text-xl">
                          {device.name}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-8 items-center">
                        <button
                          className={modalBtn}
                          onClick={handleSettingsButtonClick}
                        >
                          <DynamicIcon iconName={"Settings"} size={"20"} />
                          Einstellungen
                        </button>
                        <button className={modalBtn} onClick={() => {}}>
                          <DynamicIcon iconName={"Edit"} size={"20"} />
                          Bearbeiten
                        </button>
                        <button className={modalBtn} onClick={() => {}}>
                          <DynamicIcon iconName={"Plus"} size={"20"} />
                          Zu Szene hinzufügen
                        </button>
                        <button className={modalBtn} onClick={() => {}}>
                          <DynamicIcon iconName={"Plus"} size={"20"} />
                          Zu Zeitplan hinzufügen
                        </button>
                        <button
                          className={twMerge(
                            modalBtn,
                            "text-red hover:text-purple"
                          )}
                          onClick={handleDeleteClick}
                        >
                          <DynamicIcon iconName={"Trash"} size={"20"} />
                          Gerät löschen
                        </button>
                      </ul>
                      <button
                        className="px-5 py-3 font-bold bg-dark hover:bg-dark/70 cursor-pointer text-white rounded-md shadow-xl"
                        onClick={() => setShowModal(false)}
                      >
                        Schließen
                      </button>
                    </>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default DevicePreview;
