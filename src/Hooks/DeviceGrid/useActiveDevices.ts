import { useEffect, useState } from "react";
import { devices } from "../../data/data";

export interface IuseActiveDevicesProps {
  thisCategory: string;
}

export function useActiveDevices(props: IuseActiveDevicesProps) {
  const [activeDevices, setactiveDevices] = useState(0);
  useEffect(() => {
    const filteredDevices = devices.filter(
      (device) => device.category === props.thisCategory && device.isActive
    );

    setactiveDevices(filteredDevices.length);
  }, [props.thisCategory]);
  return activeDevices;
}
