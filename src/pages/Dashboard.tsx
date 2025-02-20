import GlowBoyz from "../components/GlowBoyz";
import HeadlineWithLink from "../components/headlineWithLink.tsx";
import DevicePreview from "../components/DevicePreview";
import { devices, scenes, schedules } from "../data/data";
import { RoomGrid } from "../components/DashboardGrid/RoomGrid.tsx";
import EmblaCarousel from "../components/EmblaCarousel/js/EmblaCarousel.tsx";
import { EmblaOptionsType } from "embla-carousel";
import { Room } from "../types/types";
import React, { useState } from "react";
import ScenePreview from "../components/ScenePreview.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/store.ts";
import { ReactSVG } from "react-svg";
import DottedArrowDown from "../assets/icons/DottedArrowDown.svg";
import { setRoom, setHierarchy, setCategory } from "../store/reducer.ts";
import { HierarchyStep } from "../types/dashboard.types.ts";
import { ScrollableNavBar } from "../components/scrollableNavBar.tsx";

interface DashboardProps {
  hasDevices?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ hasDevices = false }) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  const activeDevices = devices.filter((device) => device.isActive);
  const favoriteDevices = devices.filter((device) => device.isFavorite);
  const activeDeviceAmount = activeDevices.length;
  const OPTIONS: EmblaOptionsType = { dragFree: true };
  const dispatch = useDispatch();
  const ACTIVE_DEVICES_SLIDES = activeDevices.map((device, index) => (
    <div key={index} className="pointer-events-none">
      <DevicePreview
        device={device}
        hasToggle={false}
        hasRoomName={true}
        isSmall={true}
      />
    </div>
  ));
  const FAVORITES_DEVICES_SLIDES = favoriteDevices.map((device, index) => (
    <div key={index}>
      <DevicePreview device={device} hasToggle={false} hasRoomName={true} />
    </div>
  ));
  const SCENES_SLIDES = scenes.map((scene, index) => (
    <div key={index}>
      <ScenePreview scene={scene} />
    </div>
  ));
  const SCHEDULES_SLIDES = schedules.map((schedule, index) => (
    <div key={index}>
      <ScenePreview scene={schedule} />
    </div>
  ));

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleSelect = (room: Room | null) => {
    setSelectedRoom(room);
    dispatch(setRoom(room));
    dispatch(setHierarchy(HierarchyStep.SmartHomeGrid));
    dispatch(setCategory(null));
  };

  return (
    <div>
      {hasDevices ? (
        <div className="w-full flex flex-col gap-2 justify-start items-start">
          <ScrollableNavBar
            onRoomSelect={handleSelect}
            selectedRoom={selectedRoom}
          />
          <RoomGrid selectedRoom={selectedRoom} />
          <div className="w-full flex flex-col gap-8">
            {/*
            <div className="w-full">
              <p className="text-meta mb-2">
                {activeDeviceAmount} Aktive Geräte
              </p>
              <EmblaCarousel
                width="flex-[0_0_auto]"
                slides={ACTIVE_DEVICES_SLIDES}
                options={OPTIONS}
              />
            </div>
            */}
            <div className="w-full">
              <div className="mb-2">
                <HeadlineWithLink headline="Szenen" link="/dashboard" />
              </div>
              <EmblaCarousel
                width="flex-[0_0_auto]"
                slides={SCENES_SLIDES}
                options={OPTIONS}
              />
            </div>
            <div className="w-full">
              <div className="mb-2">
                <HeadlineWithLink headline="Favoriten" link="/dashboard" />
              </div>
              <EmblaCarousel
                slides={FAVORITES_DEVICES_SLIDES}
                options={OPTIONS}
              />
            </div>
            <div className="w-full">
              <div className="mb-2">
                <HeadlineWithLink headline="Zeitpläne" link="/dashboard" />
              </div>
              <EmblaCarousel slides={SCHEDULES_SLIDES} options={OPTIONS} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-4/5 mx-auto flex flex-col gap-1 py-16 justify-center items-center">
          <GlowBoyz isGray={true} />
          <div className="text-lg font-bold mt-16">
            Noch keine Geräte registriert
          </div>
          <p className="text-center">
            Bitte füge dein erstes Gerät zu einem Raum hinzu.
          </p>
          <ReactSVG
            src={DottedArrowDown}
            className="mt-4"
            beforeInjection={(svg) => {
              svg.setAttribute("style", `height: 158px`);
              svg.querySelectorAll("path").forEach((path) => {
                path.setAttribute("fill", "var(--color-uwu)");
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
