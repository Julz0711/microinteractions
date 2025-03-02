import * as React from "react";
import { useState } from "react";
import DynamicIcon from "./DynamicIcon";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { twMerge } from "tailwind-merge";

export interface IInstructionsProps {}

export function Instructions(props: IInstructionsProps) {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleClickMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkToTest = "text-blue hover:text-dark font-bold underline";
  return (
    <div className="fixed bg-[#cccccc] border z-[999] bottom-8 right-0 flex">
      <button
        className={twMerge("p-4", isOpen && "rotate-180")}
        onClick={handleClickMenu}
      >
        <DynamicIcon iconName="ChevronLeft" />
      </button>
      {isOpen && (
        <div className="bg-[#ffffff] p-4 flex flex-col gap-4 max-w-92">
          <h1>Aufgaben</h1>
          <form>
            <input type="checkbox" id="quest1" name="quest1" />
            <label htmlFor="quest1">Registriere Dich in der App.</label>
            <br />
            <input type="checkbox" id="quest2" name="quest2" />
            <label htmlFor="quest2">Füge ein neues Gerät hinzu.</label>
            <br />
            <input type="checkbox" id="quest3" name="quest3" />
            <label htmlFor="quest3">Führe das Tutorial durch.</label>
            <br />
            <input type="checkbox" id="quest4" name="quest4" />
            <label htmlFor="quest4">
              Schalte eine Lampe im Wohnzimmer aus.
            </label>
            <br />
            <input type="checkbox" id="quest5" name="quest5" />
            <label htmlFor="quest5">
              Stelle die Heizung in der Küche auf 20 Grad.
            </label>
            <br />
            <input type="checkbox" id="quest6" name="quest6" />
            <label htmlFor="quest6">
              Stelle den Luftbefeuchter im Bad auf einen Timer für 4 Stunden.
            </label>
            <br />
          </form>
          Nach Abschließen aller Aufgaben: <br />
          Bearbeite diesen kurzen Fragebogen. <br />
          Dieser dauert nur ca. 5 Minuten.
          {hasMicrointeractions ? (
            <a className={linkToTest}>Test A</a>
          ) : (
            <a className={linkToTest}>Text B</a>
          )}
        </div>
      )}
    </div>
  );
}
