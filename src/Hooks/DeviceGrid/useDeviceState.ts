import { setDevice, setHierarchy } from "../../store/reducer";
import { HierarchyStep } from "../../types/dashboard.types";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { useEffect, useState } from "react";
import { Device } from "../../types/types";

export interface IuseDeviceStateProps {
  buttonVariants: any;
  device: Device;
}

export function useDeviceState(props: IuseDeviceStateProps) {
  const [isDeviceActive, setIsDeviceActive] = useState(props.device.isActive);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFadedIn, setisFadedIn] = useState(false);
  const { hierarchy } = useSelector((state: AppState) => state.app);
  const [buttonState, setButtonState] = useState<string | null>(null);
  const [previousState, setPreviousState] = useState<string | null>(null);

  const dispatch = useDispatch();

  const toggleActiveState = () => {
    setIsDeviceActive((prev) => !prev);
  };

  const toggleMenuState = () => {
    //setIsMenuOpen((prev) => !prev);
    dispatch(setDevice(props.device));
    setPreviousState(buttonState);
    //setButtonState("open");
    toggleHierarchyState();
  };

  useEffect(() => {
    if (hierarchy === HierarchyStep.Device && !isMenuOpen) {
      setPreviousState(buttonState);
      //setButtonState("hidden");
    } else if (hierarchy === HierarchyStep.CategoryGrid) {
      setPreviousState(buttonState);
      setButtonState("visible");
      setIsMenuOpen(false);

      dispatch(setDevice(null));
    }
  }, [hierarchy, isMenuOpen]);

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
    previousState,
    toggleActiveState,
    toggleMenuState,
    isDeviceActive,
    isMenuOpen,
  };
}
