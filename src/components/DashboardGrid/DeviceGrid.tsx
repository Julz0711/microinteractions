import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { AppState } from "../../store/store";
import { useEffect, useState } from "react";
import { Category } from "../../types/dashboard.types";
import { devices } from "../../data/data";

export const DeviceGrid = () => {
  const { category } = useSelector((state: AppState) => state.app);
  const [buttonColorClass, setbuttonColorClass] = useState("");
  const [active, setActive] = useState(false);
  const filteredDevices = devices.filter(
    (device) => device.category === category
  );

  useEffect(() => {
    switch (category) {
      case Category.Lights:
        setbuttonColorClass("bg-orange");
        break;
      case Category.Entertainment:
        setbuttonColorClass("bg-purple");
        break;
      case Category.Heat:
        setbuttonColorClass("bg-red");
        break;
      case Category.Air:
        setbuttonColorClass("bg-green");
        break;
    }
  }, [category]);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="flex flex-wrap gap-4 absolute w-80 left-0 right-0 -top-20 m-auto">
      {filteredDevices.map((device, index) => (
        <div
          key={index}
          className={twMerge(
            buttonColorClass,
            "flex text-light font-bold items-center justify-center max-w-full max-h-full rounded-md"
          )}
          onClick={handleClick}
        >
          {active ? "X" : <>device</>}
        </div>
      ))}
    </div>
  );
};
