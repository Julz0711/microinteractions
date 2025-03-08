import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { devices } from '../../data/data';
import { DeviceBox } from './UI/DeviceBox';
import { twMerge } from 'tailwind-merge';
import { useState, useEffect } from 'react';

export interface DeviceGridProps {
  activeAnimationFinished: boolean;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export const DeviceGrid = (props: DeviceGridProps) => {
  const { category } = useSelector((state: AppState) => state.app);
  const { room, hasMicrointeractions } = useSelector(
    (state: AppState) => state.app
  );
  const filteredDevices = devices.filter(
    (device) => device.category === category && device.room === room
  );
  const [deviceboxes, setDeviceboxes] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    setTimeout(
      () => {
        setDeviceboxes(
          filteredDevices.map((device, index) => (
            <DeviceBox
              key={index}
              device={device}
              canvasRef={props.canvasRef}
              index={index}
            />
          ))
        );
      },
      hasMicrointeractions ? 0 : 150
    );
  }, []);

  return (
    <div
      className={twMerge(
        'absolute w-[276px] h-80 left-1/2 bottom-24 -translate-x-1/2'
      )}
    >
      {deviceboxes && deviceboxes}
    </div>
  );
};
