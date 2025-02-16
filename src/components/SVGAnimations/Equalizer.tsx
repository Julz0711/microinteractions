import ".CategoryStats.css";

export function Equalizer() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 250 250"
      className="circular-progress absolute -top-6 right-0 scale-50"
    >
      <rect
        className="fill-light rect1"
        x="20"
        y="95"
        width="10"
        height="60"
        rx="5"
        ry="5"
      ></rect>
      <rect
        className="fill-light bg rect2"
        x="50"
        y="100"
        width="10"
        height="50"
        rx="5"
        ry="5"
      ></rect>
      <rect
        className="fill-light bg rect3"
        x="80"
        y="105"
        width="10"
        height="40"
        rx="5"
        ry="5"
      ></rect>
      <rect
        className="fill-light bg rect4"
        x="110"
        y="100"
        width="10"
        height="50"
        rx="5"
        ry="5"
      ></rect>
      <rect
        className="fill-light bg rect5"
        x="140"
        y="95"
        width="10"
        height="60"
        rx="5"
        ry="5"
      ></rect>
    </svg>
  );
}
