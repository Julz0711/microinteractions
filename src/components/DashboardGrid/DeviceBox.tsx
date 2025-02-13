import { motion } from "framer-motion";
import { AppState } from "../../store/store";
import { useSelector } from "react-redux";
import { Device } from "../../types/types";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "../DynamicIcon";
import { useButtonVariants } from "../../Hooks/DeviceGrid/useButtonVariants";
import { useDeviceState } from "../../Hooks/DeviceGrid/useDeviceState";
import { useDeviceAnimation } from "../../Hooks/DeviceGrid/useDeviceAnimation";
import { getColor } from "../../helpers/helpers";

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
        left: 100,
        top: 200,
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
        "motion absolute min-w-32 h-32 gap-4 font-bold rounded-md select-none flex flex-col justify-center items-center"
      )}
    >
      <div className={twMerge(isMenuOpen ? "block" : "hidden")}>MENU</div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            toggleMenuState();
          }}
          className="flex bg-light p-2 justify-center items-center rounded-full overflow-hidden border-none  checked:bg-green"
        >
          <DynamicIcon
            iconName={"x"}
            color={isDeviceActive ? "text-yellow " : "text-uwu"}
          />
        </button>
        <button
          onClick={() => {
            toggleActiveState();
          }}
          className="flex bg-light p-2 justify-center items-center rounded-full overflow-hidden border-none  checked:bg-green"
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
