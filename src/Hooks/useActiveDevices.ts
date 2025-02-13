import * as React from "react";
import { devices } from "../data/data";
import { Category } from "../types/dashboard.types";

export interface IuseActiveDevicesProps {
  thisCategory: Category;
}

export function useActiveDevices(props: IuseActiveDevicesProps) {
  const [activeDevices, setActiveDevices] = React.useState(0);
  React.useEffect(() => {
    const filteredDevices = devices.filter(
      (device) => device.category === props.thisCategory
    );
    setActiveDevices(
      filteredDevices.filter((device) => device.isActive).length
    );
  }, []);
  return activeDevices;
}
