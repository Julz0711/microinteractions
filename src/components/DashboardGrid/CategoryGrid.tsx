import { twMerge } from "tailwind-merge";
import { Category } from "../../types/dashboard.types";
import { useCategoryGrid } from "../../Hooks/useCategoryGrid";
import { CategoryContent } from "./UI/CategoryContent";
import { CategoryClickBox } from "./UI/CategoryClickBox";

export interface CategoryBoxProps {
  thisCategory: Category;
  index: number;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export function CategoryBox(props: CategoryBoxProps) {
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
