import { twMerge } from "tailwind-merge";
import { Category } from "../../../types/dashboard.types";
import { useAllDevices } from "../../../Hooks/useAllDevices";
import { AppState } from "../../../store/store";
import { useSelector } from "react-redux";

export interface ICategoryClickBoxProps {
  handleClick: () => void;
  active: boolean;
  flexClasses: string;
  category: Category;
}
export function CategoryClickBox(props: ICategoryClickBoxProps) {
  const room = useSelector((state: AppState) => state.app.room);
  const allDevices = useAllDevices({
    thisCategory: props.category,
    thisRoom: room || "",
  });
  return (
    <button
      onClick={allDevices > 0 ? props.handleClick : () => {}}
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
