import DynamicIcon from "../DynamicIcon";
import "./CategoryStats.css";

export function Temperature() {
  return (
    <>
      <DynamicIcon
        iconName={"Temp"}
        color="text-light absolute -top-2"
        size="35px"
      />
      <span className="text-light text-sm font-bold absolute">22°C</span>
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        className="circular-progress"
      >
        <circle className="bg"></circle>
        <circle className="fg"></circle>
      </svg>
    </>
  );
}
