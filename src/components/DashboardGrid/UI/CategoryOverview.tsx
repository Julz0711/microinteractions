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
        "flex flex-col justify-between p-4 w-full h-full items-center"
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
      <div className="h-6 flex gap-2 font-bold opacity-60 w-full justify-end">
        <div className=" text-light text-2xl">{activeDevices}</div>
        <div className="text-sm text-light text-[10px] font-normal">
          Aktive <br /> Geräte
        </div>
      </div>
    </div>
  );
}
