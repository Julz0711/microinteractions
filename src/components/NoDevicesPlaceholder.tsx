import { ReactSVG } from "react-svg";
import GlowBoyz from "./GlowBoyz";
import DottedArrowDown from "../assets/icons/DottedArrowDown.svg";

export function NoDevicesPlaceholder() {
  return (
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
          svg.setAttribute("style", `height: 140px`);
          svg.querySelectorAll("path").forEach((path) => {
            path.setAttribute("fill", "var(--color-uwu)");
          });
        }}
      />
    </div>
  );
}
