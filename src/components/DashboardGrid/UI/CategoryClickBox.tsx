import { twMerge } from "tailwind-merge";
import { Category } from "../../../types/dashboard.types";

export interface ICategoryClickBoxProps {
  handleClick: () => void;
  active: boolean;
  flexClasses: string;
  category: Category;
}
export function CategoryClickBox(props: ICategoryClickBoxProps) {
  return (
    <button
      onClick={props.handleClick}
      className={twMerge(
        "w-full h-full absolute z-10",
        props.flexClasses,
        props.category === Category.Household
          ? !props.active && " -translate-y-10" + " absolute left-0 duration-75"
          : ""
      )}
    />
  );
}
