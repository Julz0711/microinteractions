import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHierarchy, setCategory } from "../../../store/reducer";
import { AppState } from "../../../store/store";
import { HierarchyStep } from "../../../types/dashboard.types";

export interface IDeviceOverlayProps {}

export function DeviceOverlay(props: IDeviceOverlayProps) {
  const dispatch = useDispatch();

  const hierarchy = useSelector((state: AppState) => state.app.hierarchy);
  const device = useSelector((state: AppState) => state.app.device);

  const handleCloseDevice = () => {
    dispatch(setHierarchy(HierarchyStep.CategoryGrid));
    setCategory(null);
  };
  return (
    <>
      {hierarchy === HierarchyStep.Device && device && (
        <div
          className="fixed w-full h-full top-0 left-0 z-100"
          onClick={() => handleCloseDevice()}
        >
          <div className="w-full h-full flex justify-center items-center">
            <div className="text-2xl text-light font-alte-haas-bold text-shadow">
              {device.name}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
