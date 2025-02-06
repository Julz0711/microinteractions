import { hierarchyStep } from "../../types/dashboard.types";
import { CategoryGrid } from "./CategoryGrid";
import { Device } from "./Device";
import { SmartHomeGrid } from "./SmartHomeGrid";

interface DashboardGridProps {
  hierarchy: hierarchyStep;
}

export const DashboardGrid = ({ hierarchy }: DashboardGridProps) => {
  return (
    <>
      <SmartHomeGrid hierarchy={hierarchyStep.SmartHomeGrid} />
      {hierarchy === hierarchyStep.CategoryGrid ||
        (hierarchy === hierarchyStep.Device && (
          <CategoryGrid hierarchy={hierarchyStep.SmartHomeGrid} />
        ))}
      {hierarchy === hierarchyStep.Device && (
        <Device deviceName={""} icon={""} />
      )}
    </>
  );
};
