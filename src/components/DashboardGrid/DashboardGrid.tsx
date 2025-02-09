import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { HierarchyStep } from "../../types/dashboard.types";
import { CategoryGrid } from "./CategoryGrid";
import { Device } from "./Device";
import { SmartHomeGrid } from "./SmartHomeGrid";

export const DashboardGrid = () => {
  const { hierarchy } = useSelector((state: AppState) => state.app);

  return (
    <div className="h-[50vh] w-full">
      <SmartHomeGrid />
      {(hierarchy === HierarchyStep.CategoryGrid ||
        hierarchy === HierarchyStep.Device) && <CategoryGrid />}
      {hierarchy === HierarchyStep.Device && (
        <Device deviceName={""} icon={""} />
      )}
    </div>
  );
};
