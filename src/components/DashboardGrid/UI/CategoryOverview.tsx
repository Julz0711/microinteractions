import { Category } from "../../../types/dashboard.types";
import {
  getCategoryName,
  getColor,
  getTextColor,
} from "../../../helpers/helpers";
import { useActiveDevices } from "../../../Hooks/useActiveDevices";
import { twMerge } from "tailwind-merge";
import { CategoryStats } from "./CategoryStats";

export interface ICategoryOverviewProps {
  thisCategory: Category;
}

export function CategoryOverview(props: ICategoryOverviewProps) {
  const activeDevices = useActiveDevices({ thisCategory: props.thisCategory });

  return (
    <div
      className={twMerge(
        "flex flex-col justify-between p-2 px-3 w-full h-full items-center"
      )}
    >
      <div
        className={twMerge(
          "text-[11px]  font-bold w-full",
          activeDevices > 0 ? "text-light" : getTextColor(props.thisCategory)
        )}
      >
        {getCategoryName(props.thisCategory)}
      </div>
      <CategoryStats category={props.thisCategory} />
      <div
        className={twMerge(
          "flex gap-2 font-bold w-full justify-end",
          activeDevices > 0 ? "opacity-60 " : "opacity-100"
        )}
      >
        <div
          className={twMerge(
            "text-light text-2xl",
            activeDevices > 0 ? "text-light" : "text-uwu"
          )}
        >
          {activeDevices}
        </div>
        <div
          className={twMerge(
            "text-sm text-[10px] font-normal",
            activeDevices > 0 ? "text-light" : "text-uwu font-bold"
          )}
        >
          Aktive <br /> Geräte
        </div>
      </div>
    </div>
  );
}
