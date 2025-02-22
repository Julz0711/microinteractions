import { RoomGrid } from "../components/DashboardGrid/RoomGrid.tsx";
import { Room } from "../types/types";
import React, { useState } from "react";
import { ScrollableNavBar } from "../components/scrollableNavBar.tsx";
import { NoDevicesPlaceholder } from "../components/NoDevicesPlaceholder.tsx";
import { DashboardPresets } from "../components/DashboardPresets.tsx";
import { DeviceOverlay } from "../components/DashboardGrid/UI/DeviceOverlay.tsx";

interface DashboardProps {
  hasDevices?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ hasDevices = false }) => {
  const [isRoomChanging, setIsRoomChanging] = useState(false);
  const [nextRoom, setNextRoom] = useState(Room.LivingRoom);

  const handleSelect = (room: Room) => {
    setIsRoomChanging(true);
    setNextRoom(room);
  };

  return (
    <div>
      {hasDevices ? (
        <div className="w-full flex flex-col gap-2 justify-start items-start pt-24">
          <ScrollableNavBar onRoomSelect={handleSelect} />
          <RoomGrid isRoomChanging={isRoomChanging} nextRoom={nextRoom} />
          <DeviceOverlay />
          <DashboardPresets />
        </div>
      ) : (
        <NoDevicesPlaceholder />
      )}
    </div>
  );
};

export default Dashboard;
