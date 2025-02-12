import { twMerge } from "tailwind-merge";
import { Category, HierarchyStep } from "../../types/dashboard.types";
import { useCategoryButton } from "../../Hooks/useCategoryButton";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { DeviceGrid } from "./DeviceGrid";

export interface ICategoryButtonProps {
  thisCategory: Category;
  onClick: (category: Category) => void;
  index: number;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export function CategoryGrid(props: ICategoryButtonProps) {
  const {
    buttonColorClass,
    handleClick,
    buttonRef,
    active,
    size,
    flexClasses,
    activeAnimationFinished,
  } = useCategoryButton({
    thisCategory: props.thisCategory,
    index: props.index,
    onClick: props.onClick,
    canvasRef: props.canvasRef,
  });

  const { hierarchy, category } = useSelector((state: AppState) => state.app);

  return (
    <div ref={buttonRef} className={twMerge("absolute", flexClasses)}>
      <div
        onClick={handleClick}
        className={twMerge(
          "absolute",
          active ? "h-20 w-20" : "w-full h-full ",
          flexClasses
        )}
      ></div>
      <div
        className={twMerge(
          buttonColorClass,
          "flex text-light font-bold items-center justify-center max-w-full max-h-full rounded-md"
        )}
        style={{ width: size.width, height: size.height }}
      >
        {active ? "X" : <>{props.thisCategory}</>}
        {props.thisCategory === category &&
          (hierarchy === HierarchyStep.CategoryGrid ||
            hierarchy === HierarchyStep.Device) && (
            <DeviceGrid activeAnimationFinished={activeAnimationFinished} />
          )}
      </div>
    </div>
  );
}
