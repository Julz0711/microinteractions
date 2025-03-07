import { useEffect, useState } from "react";
import DynamicIcon from "./DynamicIcon";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { twMerge } from "tailwind-merge";

export function Instructions() {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const initializeCheckboxes = () => {
    const savedCheckboxes = localStorage.getItem("checkboxes");
    return savedCheckboxes
      ? JSON.parse(savedCheckboxes)
      : {
          quest1: false,
          quest2: false,
          quest3: false,
          quest4: false,
          quest5: false,
          quest6: false,
        };
  };

  const [isOpen, setIsOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState(initializeCheckboxes);

  useEffect(() => {
    localStorage.setItem("checkboxes", JSON.stringify(checkboxes));
  }, [checkboxes]);

  const handleClickMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes: any) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  const labelClass = "ml-1";
  return (
    <div className="fixed bg-[#cccccc] border z-[999] bottom-8 left-0 flex">
      <button
        className={twMerge("p-2", isOpen && "rotate-180")}
        onClick={handleClickMenu}
      >
        <DynamicIcon iconName="ChevronRight" />
      </button>
      {isOpen && (
        <div className="bg-[#ffffff] p-4 flex flex-col gap-4 max-w-92">
          <h1>Aufgaben</h1>
          <form>
            <input
              type="checkbox"
              id="quest1"
              name="quest1"
              checked={checkboxes.quest1}
              onChange={handleCheckboxChange}
            />
            <label className={labelClass} htmlFor="quest1">
              Registriere Dich in der App.
            </label>
            <br />
            <input
              type="checkbox"
              id="quest2"
              name="quest2"
              checked={checkboxes.quest2}
              onChange={handleCheckboxChange}
            />
            <label className={labelClass} htmlFor="quest2">
              Füge ein neues Gerät hinzu. ("Neu"-Button)
            </label>
            <br />
            {hasMicrointeractions && (
              <>
                <input
                  type="checkbox"
                  id="quest3"
                  name="quest3"
                  checked={checkboxes.quest3}
                  onChange={handleCheckboxChange}
                />
                <label className={labelClass} htmlFor="quest3">
                  Schließe das Tutorial ab (Guided Tour Pop-Ups).
                </label>
                <br />
              </>
            )}
            <input
              type="checkbox"
              id="quest4"
              name="quest4"
              checked={checkboxes.quest4}
              onChange={handleCheckboxChange}
            />
            <label className={labelClass} htmlFor="quest4">
              Reduziere die Helligkeit und Farbtemperatur einer Lampe aus dem
              Wohnzimmer.
            </label>
            <br />
            <input
              type="checkbox"
              id="quest5"
              name="quest5"
              checked={checkboxes.quest5}
              onChange={handleCheckboxChange}
            />
            <label className={labelClass} htmlFor="quest5">
              Stelle die Heizung im Badezimmer auf 24 Grad.
            </label>
            <br />
            <input
              type="checkbox"
              id="quest6"
              name="quest6"
              checked={checkboxes.quest6}
              onChange={handleCheckboxChange}
            />
            <label className={labelClass} htmlFor="quest6">
              Stelle den Ventilator im Schlafzimmer auf volle Stärke und stelle
              einen Timer von 4h.
            </label>
            <br />
            <input
              type="checkbox"
              id="quest7"
              name="quest7"
              checked={checkboxes.quest7}
              onChange={handleCheckboxChange}
            />
            <label className={labelClass} htmlFor="quest6">
              Starte den Staubsaugerrobor im Flur.
            </label>
            <br />
            <input
              type="checkbox"
              id="quest8"
              name="quest8"
              checked={checkboxes.quest8}
              onChange={handleCheckboxChange}
            />
            <label className={labelClass} htmlFor="quest6">
              Starte den Bluetooth Lautsprecher in der Küche.
            </label>
            <br />
            <input
              type="checkbox"
              id="quest9"
              name="quest9"
              checked={checkboxes.quest9}
              onChange={handleCheckboxChange}
            />
            <label className={labelClass} htmlFor="quest6">
              Lösche die Leselampe im Wohnzimmer in der Geräteübersicht
            </label>
            <br />
          </form>
          Nach Abschließen aller Aufgaben: <br />
          Bearbeite diesen kurzen Fragebogen. <br />
          Dieser dauert nur ca. 5 Minuten.
          <a
            className={"text-blue hover:text-dark font-bold underline"}
            target="_blank"
            href={
              hasMicrointeractions
                ? "https://docs.google.com/forms/d/e/1FAIpQLSehxLLLh23hDtWpfjFUr3wb91Ag9vWfbxqTaJZScyHoY2aVzg/viewform?usp=header"
                : "https://docs.google.com/forms/d/e/1FAIpQLSfvJRa_eK9Eb5cLGayQy1nwPT_mzbcViHQMTPxYZ4AaYADP4Q/viewform?usp=header"
            }
            rel="noreferrer"
          >
            {hasMicrointeractions ? "Zum Usability Test" : "Zum Usability Test"}
          </a>
        </div>
      )}
    </div>
  );
}
