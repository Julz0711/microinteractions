import { motion } from "framer-motion";
import { AppState } from "../../../store/store";
import { useSelector } from "react-redux";
import { Device } from "../../../types/types";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "../../DynamicIcon";
import { useButtonVariants } from "../../../Hooks/DeviceGrid/useButtonVariants";
import { useDeviceState } from "../../../Hooks/DeviceGrid/useDeviceState";
import { useDeviceAnimation } from "../../../Hooks/DeviceGrid/useDeviceAnimation";
import { getColor } from "../../../helpers/helpers";

interface DeviceProps {
  device: Device;
  canvasRef: React.RefObject<HTMLDivElement>;
  index: number;
}

export const DeviceBox = ({ device, canvasRef, index }: DeviceProps) => {
  const { buttonVariants } = useButtonVariants({ canvasRef, index });
  const {
    buttonState,
    previousState,
    toggleActiveState,
    toggleMenuState,
    isDeviceActive,
    isMenuOpen,
  } = useDeviceState({ buttonVariants, device });
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  const { scope } = useDeviceAnimation({
    buttonState,
    previousState,
    buttonVariants,
    index,
  });

  return (
    <motion.div
      key={index}
      custom={index}
      ref={scope}
      initial={{
        scale: 0,
        opacity: 0,
        left: 120,
        top: 500 - Math.floor(index / 2) * 100,
      }}
      variants={buttonVariants}
      className={twMerge(
        hasMicrointeractions
          ? isDeviceActive
            ? "device-box-" + device.category.toLowerCase()
            : "device-box-dashboard-inactive"
          : isDeviceActive
          ? getColor(device.category).toLowerCase()
          : "bg-" + device.category.toLowerCase(),
        "motion absolute gap-4 font-bold rounded-md select-none flex flex-col justify-center items-center"
      )}
    >
      {isMenuOpen && (
        <div className="text-dark h-58 w-44 p-4">
          <div>{device.name}</div>
        </div>
      )}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            toggleMenuState();
          }}
          className="my-4 flex bg-light p-2 justify-center items-center rounded-full overflow-hidden border-none  checked:bg-green"
        >
          <DynamicIcon
            iconName={"Close"}
            color={isDeviceActive ? "text-yellow " : "text-uwu"}
          />
        </button>
        <button
          onClick={() => {
            toggleActiveState();
          }}
          className="my-4 flex bg-light p-2 justify-center items-center rounded-full overflow-hidden border-none  checked:bg-green"
        >
          <DynamicIcon
            iconName={device.icon}
            color={isDeviceActive ? "text-yellow " : "text-uwu"}
          />
        </button>
      </div>
    </motion.div>
  );
};
