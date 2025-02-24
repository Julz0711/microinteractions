import { useState } from "react";
import { Scene } from "../types/types";
import { AppState } from "../store/store";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import DynamicIcon from "./DynamicIcon";
import { twMerge } from "tailwind-merge";

interface ScenePreviewProps {
  scene: Scene;
}

const onActiveAnimationBox = {
  initial: { scale: 1 },
  transition: { duration: 0.4, easing: "ease" },
};

const ScenePreview = ({ scene }: ScenePreviewProps) => {
  const [isBoxActive, setIsBoxActive] = useState(scene.isActive);
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const toggleActiveState = () => {
    setIsBoxActive((prev) => !prev);
  };

  return (
    <motion.div
      onClick={toggleActiveState}
      initial={hasMicrointeractions ? onActiveAnimationBox.initial : undefined}
      transition={
        hasMicrointeractions ? onActiveAnimationBox.transition : undefined
      }
      animate={
        hasMicrointeractions && isBoxActive
          ? { scale: [1, 1.05, 1] }
          : { scale: 1 }
      }
      className={`flex flex-row justify-center items-center cursor-pointer font-bold gap-3 pl-3 pr-4 py-3 rounded-md select-none ${
        hasMicrointeractions
          ? isBoxActive
            ? "device-box-active"
            : "device-box-inactive"
          : ""
      } ${isBoxActive ? "shadow-active bg-light" : "bg-inactive"}`}
    >
      <div className={twMerge("rounded-full p-1")}>
        <div className="z-90">
          <DynamicIcon
            iconName={scene.icon}
            color={isBoxActive ? `text-${scene.color}` : "text-dark"}
            size={"25"}
          />
        </div>
      </div>
      <span className="text-xs">{scene.name}</span>
    </motion.div>
  );
};

export default ScenePreview;
