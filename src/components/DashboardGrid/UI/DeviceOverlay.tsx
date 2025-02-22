import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHierarchy, setCategory } from "../../../store/reducer";
import { AppState } from "../../../store/store";
import { HierarchyStep } from "../../../types/dashboard.types";
import { TopContextBar } from "../../TopContextBar";
import { useState } from "react";

export interface IDeviceOverlayProps {}

export function DeviceOverlay(props: IDeviceOverlayProps) {
  const dispatch = useDispatch();

  const hierarchy = useSelector((state: AppState) => state.app.hierarchy);
  const device = useSelector((state: AppState) => state.app.device);
  const [SliderValue, setSliderValue] = useState(25);

  const handleCloseDevice = () => {
    dispatch(setHierarchy(HierarchyStep.CategoryGrid));
    setCategory(null);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  return (
    <>
      {hierarchy === HierarchyStep.Device && device && (
        <div className="fixed w-full h-full top-0 left-0 z-100 px-4">
          <TopContextBar
            headline={device.name}
            metaDescription={device.model}
            rightIcon="Options"
            rightIconBg={true}
            leftIcon="ChevronLeft"
            leftIconClick={() => handleCloseDevice()}
          />
          <input
            type="range"
            min={0}
            max="100"
            value={SliderValue}
            className="range"
            step="25"
            onChange={handleSliderChange} // Handle slider change
          />
          <div className="range flex w-full justify-between px-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>
      )}
    </>
  );
}
