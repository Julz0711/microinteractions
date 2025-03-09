import RandomizeAppState from "../components/RandomizeAppState";
import Menu from "../assets/img/menu.png";
import { useState } from "react";
import posthog from "posthog-js";

const Start = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (checked) {
      posthog.opt_in_capturing();
      posthog.capture("opt_in_capturing", { status: "opted_in" });
    } else {
      posthog.opt_out_capturing();
      posthog.capture("opt_out_capturing", { status: "opted_out" });
    }
  };

  return (
    <div className="fixed inset-0 p-5 w-full h-full flex flex-col justify-between overflow-y-scroll overflow-x-hidden">
      <div>
        <h1 className="font-bold">Usability Test</h1>
      </div>

      <div>
        <span className="mt-4 font-bold">Informationen zum Test</span>
        <ul className="w-full list-disc pl-5 text-sm font-normal space-y-4">
          <li>
            In diesem Test bist Du Nutzer*in einer Smarthome App. Du erhältst
            verschiedene Aufgaben, die Du zur Einrichtung und Bedienung Deines
            Smarthomes erledigen möchtest.
          </li>
          <li>
            Die Inhalte der App sind Platzhalter und dienen zur
            Veranschaulichung der Benutzeroberfläche.
          </li>
          <li className="mt-2">
            Die zu erledigen Aufgaben findest Du in der unteren linken Ecke
            deines Bildschirms im ausklappbaren Menü:
            <img src={Menu} width={"40"} />
            Zur Orientierung kannst du erledigte Aufgaben mit der Checkbox
            abhaken.
          </li>
          <li>
            Nachdem Du die Aufgaben erledigt hast, fülle bitte das Formular aus,
            das Du im Aufklappmenü findest.
          </li>
          <li className="space-y-2">
            <p>
              Wir verwenden PostHog zur Erfassung anonymisierter Nutzungsdaten.
              Die Daten werden nicht an Dritte weitergegeben und lediglich zur
              Analyse des Nutzungsverhaltens genutzt. Um uns bei der User
              Research bestmöglich zu unterstützen, bitten wir Dich, mögliche
              Adblocker zu deaktiveren.
            </p>
            <a
              href="https://posthog.com/"
              className="font-bold text-blue hover:text-dark underline"
              target="_blank"
              rel="noreferrer"
            >
              Mehr Informationen zu Posthog
            </a>
            <div className="flex gap-2 items-center mt-2">
              <input
                type="checkbox"
                className="checkbox checkbox-md checkbox-primary"
                onChange={handleCheckboxChange}
              />
              <span>Einverstanden</span>
            </div>
          </li>

          <li>
            Dieser Test dauert ca. 10 Minuten. <b>Viel Spaß!</b>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <RandomizeAppState disabled={!isChecked} />
      </div>
    </div>
  );
};

export default Start;
