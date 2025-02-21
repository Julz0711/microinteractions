import EmblaCarousel from "./EmblaCarousel/js/EmblaCarousel";
import HeadlineWithLink from "./headlineWithLink";
import { devices, scenes, schedules } from "../data/data";
import DevicePreview from "./DevicePreview";
import ScenePreview from "./ScenePreview";
import { EmblaOptionsType } from "embla-carousel";

export function DashboardPresets() {
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
  return (
    <div className="w-full flex flex-col gap-8">
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
        <EmblaCarousel slides={FAVORITES_DEVICES_SLIDES} options={OPTIONS} />
      </div>
      <div className="w-full">
        <div className="mb-2">
          <HeadlineWithLink headline="Zeitpläne" link="/dashboard" />
        </div>
        <EmblaCarousel slides={SCHEDULES_SLIDES} options={OPTIONS} />
      </div>
    </div>
  );
}
