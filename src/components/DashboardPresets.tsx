import EmblaCarousel from "./EmblaCarousel/js/EmblaCarousel";
import HeadlineWithLink from "./HeadlineWithLink";
import { devices, scenes, schedules } from "../data/data";
import DevicePreview from "./DevicePreview";
import ScenePreview from "./ScenePreview";
import { EmblaOptionsType } from "embla-carousel";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function DashboardPresets() {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const OPTIONS: EmblaOptionsType = { dragFree: true };
  const favoriteDevices = devices.filter((device) => device.isFavorite);
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

  const [showAllScenes, setShowAllScenes] = useState(false);
  const [showAllDevices, setShowAllDevices] = useState(false);
  const [showAllSchedules, setShowAllSchedules] = useState(false);

  const showMoreLessBtn = twMerge(
    "font-bold text-xs text-dark hover:text-uwu underline hover:underline-none cursor-pointer",
    (showAllScenes || showAllDevices || showAllSchedules) && "pl-1"
  );

  return (
    <div className="w-full flex flex-col gap-8">
      {hasMicrointeractions ? (
        <>
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
        </>
      ) : (
        <>
          <div className="w-full">
            <div className="mb-2">
              <HeadlineWithLink headline="Szenen" link="/dashboard" />
            </div>
            <div className="w-full flex flex-row flex-wrap items-center gap-4">
              {(showAllScenes ? scenes : scenes.slice(0, 3)).map(
                (scene, index) => (
                  <ScenePreview key={index} scene={scene} />
                )
              )}
              {scenes.length > 3 && (
                <button
                  onClick={() => setShowAllScenes(!showAllScenes)}
                  className={showMoreLessBtn}
                >
                  {showAllScenes ? "weniger anzeigen" : "alle anzeigen"}
                </button>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2">
              <HeadlineWithLink headline="Favoriten" link="/dashboard" />
            </div>
            <div className="w-full flex flex-row flex-wrap items-center gap-4">
              {(showAllDevices
                ? favoriteDevices
                : favoriteDevices.slice(0, 3)
              ).map((device, index) => (
                <DevicePreview
                  key={index}
                  device={device}
                  hasToggle={false}
                  hasRoomName={true}
                  isSmall={true}
                />
              ))}
              {devices.length > 3 && (
                <button
                  onClick={() => setShowAllDevices(!showAllDevices)}
                  className={showMoreLessBtn}
                >
                  {showAllDevices ? "weniger anzeigen" : "alle anzeigen"}
                </button>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2">
              <HeadlineWithLink headline="Zeitpläne" link="/dashboard" />
            </div>
            <div className="w-full flex flex-row flex-wrap items-center gap-4">
              {(showAllSchedules ? schedules : schedules.slice(0, 3)).map(
                (schedule, index) => (
                  <ScenePreview key={index} scene={schedule} />
                )
              )}
              {schedules.length > 3 && (
                <button
                  onClick={() => setShowAllSchedules(!showAllSchedules)}
                  className={showMoreLessBtn}
                >
                  {showAllSchedules ? "weniger anzeigen" : "alle anzeigen"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
