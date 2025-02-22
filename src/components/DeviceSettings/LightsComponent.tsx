import { Slider } from "../Slider/Slider";

export function LightsComponent() {
  return (
    <>
      <div className="grid grid-cols-[1fr_1fr] place-items-center h-80">
        <Slider hasGradient={false} />
        <Slider hasGradient={true} />
      </div>
    </>
  );
}
