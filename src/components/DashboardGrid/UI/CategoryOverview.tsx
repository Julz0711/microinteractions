import { Category } from "../../../types/dashboard.types";
import { getCategoryName } from "../../../helpers/helpers";
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
          activeDevices > 0 ? "text-light" : "text-dark"
        )}
      >
        {getCategoryName(props.thisCategory)}
      </div>
      <CategoryStats category={props.thisCategory} />
      <div className="flex gap-2 font-bold opacity-60 w-full justify-end">
        <div
          className={twMerge(
            "text-light text-2xl",
            activeDevices > 0 ? "text-light" : "text-dark"
          )}
        >
          {activeDevices}
        </div>
        <div
          className={twMerge(
            "text-sm text-[10px] font-normal",
            activeDevices > 0 ? "text-light" : "text-dark"
          )}
        >
          Aktive <br /> Geräte
        </div>
      </div>
    </div>
  );
}
