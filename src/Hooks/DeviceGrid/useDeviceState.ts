import * as React from "react";
import { setHierarchy } from "../../store/reducer";
import { HierarchyStep } from "../../types/dashboard.types";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { useEffect } from "react";
import { Device } from "../../types/types";

export interface IuseDeviceStateProps {
  buttonVariants: any;
  device: Device;
}

export function useDeviceState(props: IuseDeviceStateProps) {
  const [isDeviceActive, setIsDeviceActive] = React.useState(
    props.device.isActive
  );
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isFadedIn, setisFadedIn] = React.useState(false);
  const { hierarchy } = useSelector((state: AppState) => state.app);
  const [buttonState, setButtonState] = React.useState<string | null>(null);

  const dispatch = useDispatch();

  const toggleActiveState = () => {
    setIsDeviceActive((prev) => !prev);
  };

  const toggleMenuState = () => {
    setIsMenuOpen((prev) => !prev);
    setButtonState("active");
    toggleHierarchyState();
  };

  useEffect(() => {
    if (hierarchy === HierarchyStep.Device && !isMenuOpen) {
      setButtonState("hidden");
    } else if (
      props.buttonVariants &&
      hierarchy === HierarchyStep.CategoryGrid
    ) {
      setButtonState("visible");
    }
  }, [props.buttonVariants, hierarchy, isMenuOpen]);

  useEffect(() => {
    if (!isFadedIn && props.buttonVariants) {
      setButtonState("visible");
      setisFadedIn(true);
    }
  }, [props.buttonVariants, isFadedIn]);

  const toggleHierarchyState = () => {
    dispatch(
      setHierarchy(
        hierarchy === HierarchyStep.CategoryGrid
          ? HierarchyStep.Device
          : HierarchyStep.CategoryGrid
      )
    );
  };

  return {
    buttonState,
    toggleActiveState,
    toggleMenuState,
    isDeviceActive,
    isMenuOpen,
  };
}
