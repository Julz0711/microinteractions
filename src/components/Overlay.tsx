import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { HierarchyStep } from "../types/dashboard.types";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";

export interface IOverlayProps {
  isMenuOpen: boolean;
}

export function Overlay(props: IOverlayProps) {
  const hierarchy = useSelector((state: AppState) => state.app.hierarchy);
  return (
    <AnimatePresence>
      {(props.isMenuOpen || hierarchy == HierarchyStep.Device) && (
        <motion.div
          className={twMerge(
            "fixed h-full w-full inset-0  bg-dark/30 backdrop-blur-[2px]",
            hierarchy == HierarchyStep.Device ? "z-90" : "z-80"
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
