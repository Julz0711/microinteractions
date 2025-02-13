import * as React from "react";
import { twMerge } from "tailwind-merge";
import { getColor } from "../../../helpers/helpers";
import { Category, HierarchyStep } from "../../../types/dashboard.types";
import DynamicIcon from "../../DynamicIcon";
import { DeviceGrid } from "../DeviceGrid";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import { CategoryOverview } from "./CategoryOverview";

export interface ICategoryContentProps {
  thisCategory: Category;
  canvasRef: React.RefObject<HTMLDivElement>;
  size: { width: number; height: number };
  active: boolean;
  activeAnimationFinished: boolean;
}

export function CategoryContent(props: ICategoryContentProps) {
  const { hierarchy, category } = useSelector((state: AppState) => state.app);
  return (
    <div
      className={twMerge(
        getColor(props.thisCategory),
        "flex items-center justify-center max-w-full max-h-full rounded-md",
        props.thisCategory === Category.Household
          ? "relative top-[-50px] left-0"
          : ""
      )}
      style={{ width: props.size.width, height: props.size.height }}
    >
      {props.active ? (
        <DynamicIcon iconName="Close" color="text-light" />
      ) : (
        <CategoryOverview thisCategory={props.thisCategory} />
      )}
      {props.thisCategory === category &&
        (hierarchy === HierarchyStep.CategoryGrid ||
          hierarchy === HierarchyStep.Device) && (
          <DeviceGrid
            activeAnimationFinished={props.activeAnimationFinished}
            canvasRef={props.canvasRef}
          />
        )}
    </div>
  );
}
