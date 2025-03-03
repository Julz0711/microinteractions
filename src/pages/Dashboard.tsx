import { RoomGrid } from "../components/DashboardGrid/RoomGrid.tsx";
import { Room } from "../types/types";
import React, { useState, useRef } from "react";
import { ScrollableNavBar } from "../components/ScrollableNavBar.tsx";
import { NoDevicesPlaceholder } from "../components/NoDevicesPlaceholder.tsx";
import { DashboardPresets } from "../components/DashboardPresets.tsx";
import { DeviceOverlay } from "../components/DashboardGrid/UI/DeviceOverlay.tsx";
import Hotspot from "../components/Hotspot/Hotspot.tsx";
import { useSelector } from "react-redux";
import { AppState } from "../store/store.ts";

interface DashboardProps {
  hasDevices?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ hasDevices = false }) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const [isRoomChanging, setIsRoomChanging] = useState(false);
  const [nextRoom, setNextRoom] = useState(Room.LivingRoom);

  const [tourStep, setTourStep] = useState(0);
  const totalSteps = 3;

  const navbarRef = useRef<HTMLDivElement>(null);
  const roomGridRef = useRef<HTMLDivElement>(null);
  const dashboardPresetsRef = useRef<HTMLDivElement>(null);

  const handleSelect = (room: Room) => {
    setIsRoomChanging(true);
    setNextRoom(room);
  };

  const handleNextStep = () => {
    if (tourStep < totalSteps - 1) {
      setTourStep(tourStep + 1);
      scrollToNextStep(tourStep + 1);
    } else {
      //localStorage.setItem(TOUR_STORAGE_KEY, "true")
      //setTourStep(totalSteps); // Hide tour
    }
  };

  const scrollToNextStep = (step: number) => {
    switch (step) {
      case 1:
        roomGridRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case 2:
        dashboardPresetsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {hasDevices ? (
        <div className="w-full flex flex-col gap-2 justify-start items-start pt-24">
          <div className="h-2"></div>
          <div className="w-full relative" ref={navbarRef}>
            <div id="navbar">
              <ScrollableNavBar onRoomSelect={handleSelect} />
            </div>
            {hasMicrointeractions && tourStep === 0 && (
              <Hotspot
                targetId="navbar"
                header="Räume"
                message="Hier siehst du alle deine Räume auf einen Blick und kannst schnell zwischen diesen wechseln."
                step={1}
                totalSteps={totalSteps}
                onNext={handleNextStep}
              />
            )}
          </div>
          <div className="w-full relative" ref={roomGridRef}>
            <div id="room-grid">
              <RoomGrid isRoomChanging={isRoomChanging} nextRoom={nextRoom} />
            </div>
            {tourStep === 1 && (
              <Hotspot
                targetId="room-grid"
                header="Alle Geräte"
                message="Hier kannst du schnell und bequem auf alle Geräte in diesem Raum zugreifen."
                step={2}
                totalSteps={totalSteps}
                onNext={handleNextStep}
              />
            )}
          </div>
          <DeviceOverlay />
          <div className="w-full relative" ref={dashboardPresetsRef}>
            <div id="dashboard-presets">
              <DashboardPresets />
            </div>
            {tourStep === 2 && (
              <Hotspot
                targetId="dashboard-presets"
                header="Schnellzugriff"
                message="Hier kannst du deine Szenen, Lieblingsgeräte und Zeitpläne ganz einfach steuern – ein- und ausschalten mit nur einem Klick!"
                step={3}
                totalSteps={totalSteps}
                onNext={handleNextStep}
              />
            )}
          </div>
        </div>
      ) : (
        <NoDevicesPlaceholder />
      )}
    </div>
  );
};

export default Dashboard;
