import { useEffect, useState } from "react";
import { devices } from "../../data/data";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { cp } from "fs";

export interface IuseActiveDevicesProps {
  thisCategory: string;
}

export function useActiveDevices(props: IuseActiveDevicesProps) {
  const [activeDevices, setactiveDevices] = useState(0);
  const room = useSelector((state: AppState) => state.app.room);
  useEffect(() => {
    const filteredDevices = devices.filter(
      (device) =>
        device.category === props.thisCategory &&
        device.isActive &&
        device.room === room
    );
    setactiveDevices(filteredDevices.length);
  }, [room]);
  return activeDevices;
}
