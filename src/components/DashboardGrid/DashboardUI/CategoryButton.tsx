import { twMerge } from "tailwind-merge";
import { Category } from "../../../types/dashboard.types";
import { useCategoryButton } from "../../../Hooks/useCategoryButton";

export interface ICategoryButtonProps {
  thisCategory: Category;
  onClick: (category: Category) => void;
  index: number;
}

export function CategoryButton(props: ICategoryButtonProps) {
  const { buttonColorClass, handleClick, buttonRef, active } =
    useCategoryButton({
      thisCategory: props.thisCategory,
      index: props.index,
      onClick: props.onClick,
    });

  return (
    <button
      onClick={handleClick}
      ref={buttonRef}
      className={twMerge(
        "h-40 w-40 flex text-light font-bold items-center justify-center absolute rounded-md",
        buttonColorClass
      )}
    >
      {active ? "X" : <>{props.thisCategory}</>}
    </button>
  );
}
