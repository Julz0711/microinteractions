import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { hierarchyStep } from "../../types/dashboard.types";
import { CategoryGrid } from "./CategoryGrid";
import { Device } from "./Device";
import { SmartHomeGrid } from "./SmartHomeGrid";
import { useEffect } from "react";

export const DashboardGrid = () => {
  const { hierarchy } = useSelector((state: AppState) => state.app);

  useEffect(() => {
    console.log("Hierarchy: ", hierarchy === hierarchyStep.CategoryGrid);
  }, [hierarchy]);
  return (
    <div className="h-[50vh] w-full">
      <SmartHomeGrid />
      {(hierarchy === hierarchyStep.CategoryGrid ||
        hierarchy === hierarchyStep.Device) && <CategoryGrid />}
      {hierarchy === hierarchyStep.Device && (
        <Device deviceName={""} icon={""} />
      )}
    </div>
  );
};
