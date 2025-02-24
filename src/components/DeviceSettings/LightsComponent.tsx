import { Slider } from "../Slider/Slider";

export function LightsComponent() {
  return (
    <>
      <div className="grid grid-cols-[1fr_1fr] gap-8 place-items-center h-80 px-12">
        <Slider hasGradient={false} size={"60"} clickable={true} />
        <Slider hasGradient={true} size={"60"} clickable={true} />
      </div>
    </>
  );
}
