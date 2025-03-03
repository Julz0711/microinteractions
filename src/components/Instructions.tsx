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

  const labelClass = "ml-1";
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
            <label className={labelClass} htmlFor="quest1">
              Registriere Dich in der App.
            </label>
            <br />
            <input type="checkbox" id="quest2" name="quest2" />
            <label className={labelClass} htmlFor="quest2">
              Füge ein neues Gerät hinzu.
            </label>
            <br />
            <input type="checkbox" id="quest3" name="quest3" />
            <label className={labelClass} htmlFor="quest3">
              Führe das Tutorial durch.
            </label>
            <br />
            <input type="checkbox" id="quest4" name="quest4" />
            <label className={labelClass} htmlFor="quest4">
              Schalte eine Lampe im Wohnzimmer aus.
            </label>
            <br />
            <input type="checkbox" id="quest5" name="quest5" />
            <label className={labelClass} htmlFor="quest5">
              Stelle die Heizung in der Küche auf 20 Grad.
            </label>
            <br />
            <input type="checkbox" id="quest6" name="quest6" />
            <label className={labelClass} htmlFor="quest6">
              Stelle den Luftbefeuchter im Bad auf einen Timer für 4 Stunden.
            </label>
            <br />
          </form>
          Nach Abschließen aller Aufgaben: <br />
          Bearbeite diesen kurzen Fragebogen. <br />
          Dieser dauert nur ca. 5 Minuten.
          <a
            className={"text-blue hover:text-dark font-bold underline"}
            href={
              hasMicrointeractions
                ? "https://docs.google.com/forms/d/e/1FAIpQLSehxLLLh23hDtWpfjFUr3wb91Ag9vWfbxqTaJZScyHoY2aVzg/viewform?usp=header"
                : "https://docs.google.com/forms/d/e/1FAIpQLSfBxdORxT6FbVjnZaPStTDOFkIPU6MEK17tDthR65jTN8SepA/viewform?usp=header"
            }
          >
            {hasMicrointeractions ? "Zum Usability Test" : "Zum Usability Test"}
          </a>
        </div>
      )}
    </div>
  );
}
