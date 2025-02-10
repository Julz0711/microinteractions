import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { HierarchyStep } from "../../types/dashboard.types";
import { DeviceGrid } from "./DeviceGrid";
import { Device } from "./Device";
import { RoomGrid } from "./RoomGrid";

export const DashboardGrid = () => {
  const { hierarchy } = useSelector((state: AppState) => state.app);

  return (
    <div className="h-[50vh] w-full flex flex-col items-center justify-center">
      <RoomGrid />
      {(hierarchy === HierarchyStep.CategoryGrid ||
        hierarchy === HierarchyStep.Device) && <DeviceGrid />}
      {hierarchy === HierarchyStep.Device && (
        <Device deviceName={""} icon={""} />
      )}
    </div>
  );
};
