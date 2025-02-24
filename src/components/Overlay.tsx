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
  const [fadeColor, setFadeColor] = useState("rgba(255, 255, 255, 0.3)");

  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  useEffect(() => {
    if (hasMicrointeractions) {
      if (hierarchy == HierarchyStep.Device && isOn) {
        switch (category) {
          case Category.Lights:
            setFadeColor("rgba(239, 133, 85, 0.25)");
            break;
          case Category.Heat:
            setFadeColor("rgba(190, 55, 95, 0.25)");
            break;
          case Category.Entertainment:
            setFadeColor("rgba(96, 36, 108, 0.25)");
            break;
          case Category.Air:
            setFadeColor("rgba(28, 165, 142, 0.25)");
            break;
          case Category.Household:
            setFadeColor("rgba(38, 51, 129, 0.25)");
            break;
          default:
            setFadeColor("rgba(255, 255, 255, 0.25)");
        }
      } else {
        setFadeColor("rgba(255, 255, 255, 0.05)");
      }
    } else {
      setFadeColor("rgba(255, 255, 255, 0.3)"); // always white
    }
  }, [category, hierarchy, isOn]);

  return (
    <AnimatePresence>
      {(props.isMenuOpen || hierarchy == HierarchyStep.Device) && (
        <motion.div
          className={twMerge(
            "fixed h-full w-full inset-0 backdrop-blur-[2px]",
            hierarchy == HierarchyStep.Device
              ? "backdrop-blur-[20px] z-90"
              : "z-80"
          )}
          initial={hasMicrointeractions ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1, backgroundColor: fadeColor }}
          exit={hasMicrointeractions ? { opacity: 0 } : { opacity: 1 }}
          transition={
            hasMicrointeractions ? { duration: 0.2 } : { duration: 0 }
          }
          style={{ width: "100%" }}
        />
      )}

      {(props.isMenuOpen || hierarchy == HierarchyStep.Device) && (
        <motion.div
          className={twMerge(
            "fixed h-full w-full inset-0 backdrop-blur-[15px]",
            hierarchy == HierarchyStep.Device
              ? "backdrop-blur-[40px] z-90"
              : "z-80"
          )}
          initial={hasMicrointeractions ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1, backgroundColor: fadeColor }}
          exit={hasMicrointeractions ? { opacity: 0 } : { opacity: 1 }}
          transition={
            hasMicrointeractions ? { duration: 0.2 } : { duration: 0 }
          }
          style={{ width: "100%" }}
        />
      )}
    </AnimatePresence>
  );
}
