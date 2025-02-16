import { twMerge } from "tailwind-merge";
import { Category } from "../../../types/dashboard.types";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";

export interface ICategoryClickBoxProps {
  handleClick: () => void;
  active: boolean;
  flexClasses: string;
  category: Category;
}
export function CategoryClickBox(props: ICategoryClickBoxProps) {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  return (
    <button
      onClick={props.handleClick}
      className={twMerge(
        "w-full h-full absolute z-10",
        props.flexClasses,
        props.category === Category.Household
          ? "absolute top-[-50px] left-0"
          : ""
      )}
    />
  );
}
