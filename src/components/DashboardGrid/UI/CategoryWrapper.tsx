import { twMerge } from "tailwind-merge";
import { Category } from "../../../types/dashboard.types";
import { useCategoryGrid } from "../../../Hooks/useCategoryGrid";
import { CategoryContent } from "./CategoryContent";
import { CategoryClickBox } from "./CategoryClickBox";

export interface CategoryWrapperProps {
  thisCategory: Category;
  index: number;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export function CategoryWrapper(props: CategoryWrapperProps) {
  const {
    handleSetHierarchy,
    buttonRef,
    active,
    size,
    flexClasses,
    activeAnimationFinished,
  } = useCategoryGrid({
    thisCategory: props.thisCategory,
    index: props.index,
    canvasRef: props.canvasRef,
  });

  return (
    <div
      ref={buttonRef}
      className={twMerge("categoryWrapper absolute", flexClasses)}
    >
      <CategoryClickBox
        handleClick={handleSetHierarchy}
        active={active}
        flexClasses={flexClasses}
        category={props.thisCategory}
      />
      <CategoryContent
        thisCategory={props.thisCategory}
        canvasRef={props.canvasRef}
        size={size}
        active={active}
        activeAnimationFinished={activeAnimationFinished}
      />
    </div>
  );
}
