import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Category, HierarchyStep } from "../types/dashboard.types";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { useEffect, useState } from "react";

export interface IOverlayProps {
  isMenuOpen: boolean;
}

export function Overlay(props: IOverlayProps) {
  const hierarchy = useSelector((state: AppState) => state.app.hierarchy);
  const category = useSelector((state: AppState) => state.app.category);
  const isOn = useSelector((state: AppState) => state.app.isOn);
  const [fadeColor, setfadeColor] = useState("bg-light/30");

  useEffect(() => {
    if (hierarchy == HierarchyStep.Device && isOn) {
      switch (category) {
        case Category.Lights:
          setfadeColor("bg-orange/25");
          break;
        case Category.Heat:
          setfadeColor("bg-red/25");
          break;
        case Category.Entertainment:
          setfadeColor("bg-purple/25");
          break;
        case Category.Air:
          setfadeColor("bg-green/25");
          break;
        case Category.Household:
          setfadeColor("bg-blue/25");
          break;
        default:
          setfadeColor("bg-light/25");
      }
    } else {
      setfadeColor("bg-light/5");
    }
  }, [category, hierarchy, isOn]);

  return (
    <AnimatePresence>
      {(props.isMenuOpen || hierarchy == HierarchyStep.Device) && (
        <motion.div
          className={twMerge(
            "fixed h-full w-full inset-0  bg-light/30 backdrop-blur-[2px]",
            hierarchy == HierarchyStep.Device
              ? "backdrop-blur-[20px] z-90 " + fadeColor
              : "z-80"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ width: "100%" }}
        />
      )}

      {(props.isMenuOpen || hierarchy == HierarchyStep.Device) && (
        <motion.div
          className={twMerge(
            "fixed h-full w-full inset-0  bg-light/30 backdrop-blur-[15px]",
            hierarchy == HierarchyStep.Device
              ? "backdrop-blur-[40px] z-90 " + fadeColor
              : "z-80"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ width: "100%" }}
        />
      )}
    </AnimatePresence>
  );
}
