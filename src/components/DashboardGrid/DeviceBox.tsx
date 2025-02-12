import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AppState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Device } from "../../types/types";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "../DynamicIcon";
import { setHierarchy } from "../../store/reducer";
import { HierarchyStep } from "../../types/dashboard.types";
import { gsap } from "gsap";
import { base } from "framer-motion/client";

interface DeviceProps {
  device: Device;
  canvasRef: React.RefObject<HTMLDivElement>;
  index: number;
}

const onActiveAnimationBox = {
  initial: { scale: 1 },
  transition: { duration: 0.3, easing: "ease" },
};

export const DeviceBox = ({ device, canvasRef, index }: DeviceProps) => {
  const [isDeviceActive, setIsDeviceActive] = useState(device.isActive);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  const padding = 20;
  const buttonRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { hierarchy } = useSelector((state: AppState) => state.app);
  const [basePosition, setbasePosition] = useState({ x: 0, y: 0 });

  const toggleActiveState = () => {
    setIsDeviceActive((prev) => !prev);
  };

  const toggleOpenState = () => {
    setIsMenuOpen((prev) => !prev);
    dispatch(setHierarchy(HierarchyStep.Device));
  };

  const buttonVariants = {
    hidden: (index: number) => ({
      scaleX: 0,
      scaleY: 0,
      y: 180 - Math.floor(index / 2) * 60,
      x: 80 - (index % 2) * 160,
    }),
    visible: (index: number) => ({
      scaleX: 1,
      scaleY: 1,
      y: -10,
      x: 0,
      transition: {
        duration: hasMicrointeractions ? 0.2 : 0,
        ease: "easeOut",
        delay: 0.09 + index * 0.05,
      },
    }),
  };

  useEffect(() => {
    const windowWidth = canvasRef.current!.clientWidth;
    const windowHeight = canvasRef.current!.clientHeight;

    const xDirection = basePosition.x - windowWidth / 2;
    const yDirection = basePosition.y - windowHeight / 2;
    const length = Math.sqrt(xDirection ** 2 + yDirection ** 2);
    const xNormalized = xDirection / length;
    const yNormalized = yDirection / length;
    const styleXPos =
      Math.floor(index % 2) * 160 + Math.floor(index % 2) * padding;
    const styleYPos =
      Math.floor(index / 2) * 160 + Math.floor(index / 2) * padding;
    setbasePosition({ x: styleXPos, y: styleYPos });
    const styleXPosHidden = styleXPos + xNormalized * 50;
    if (isMenuOpen) {
      gsap.to(buttonRef.current, {
        // Active State
        ease: "power2.out",
        left: "50%",
        top: "70%",
        height: "10rem",
        width: "10rem",
        xPercent: -50,
        yPercent: 20,
        duration: 0.3,
      });
    } else if (!isMenuOpen) {
      // Hidden State
      gsap.to(buttonRef.current, {
        ease: "power2.out",
        left: styleXPosHidden + "px",
        top: styleYPos + "px",
        height: "10rem",
        width: "10rem",
        xPercent: -50,
        yPercent: -50,
        duration: 0.3,
      });
    } else {
      gsap.to(buttonRef.current, {
        // Default State
        ease: "power2.out",
        left: styleXPos + "px",
        top: styleYPos + "px",
        height: "10rem",
        width: "10rem",
        duration: 0.3,
        xPercent: -50,
        yPercent: -50,
      });
    }
  }, [hierarchy]);

  return (
    <motion.div
      key={index}
      custom={index}
      ref={buttonRef}
      className={twMerge(
        hasMicrointeractions
          ? isDeviceActive
            ? "device-box-" + device.category.toLowerCase()
            : "device-box-dashboard-inactive"
          : "",
        "motion absolute min-w-32 h-32 gap-4 font-bold rounded-md select-none flex flex-col justify-center items-center"
      )}
      style={{ left: basePosition.x + "px", top: basePosition.y + "px" }}
    >
      <div className={twMerge(isMenuOpen ? "block" : "hidden")}>MENU</div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            toggleOpenState();
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
