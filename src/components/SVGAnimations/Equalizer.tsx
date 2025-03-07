import "./CategoryStats.css";

export function Equalizer() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 170 250"
      className="circular-progress -top-6 right-0"
    >
      <rect
        className="fill-dark bg rect1"
        x="15"
        y="115"
        width="10"
        height="20"
        rx="5"
        ry="5"
      ></rect>
      <rect
        className="fill-dark bg rect2"
        x="35"
        y="100"
        width="10"
        height="50"
        rx="5"
        ry="5"
      ></rect>
      <rect
        className="fill-dark bg rect3"
        x="60"
        y="105"
        width="10"
        height="40"
        rx="5"
        ry="5"
      ></rect>
      <rect
        className="fill-dark bg rect4"
        x="85"
        y="100"
        width="10"
        height="50"
        rx="5"
        ry="5"
      ></rect>
      <rect
        className="fill-dark bg rect5"
        x="110"
        y="95"
        width="10"
        height="60"
        rx="5"
        ry="5"
      ></rect>
      <rect
        className="fill-dark bg rect5"
        x="135"
        y="115"
        width="10"
        height="20"
        rx="5"
        ry="5"
      ></rect>
    </svg>
  );
}
