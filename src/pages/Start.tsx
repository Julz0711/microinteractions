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
    <div className="fixed inset-0 p-5 w-full h-full flex flex-col justify-between">
      <div>
        <h1 className="font-bold">Microinteraction Test</h1>
        <div className="mt-2 font-normal text-xs">
          Eine Bacheelorarbeit zum Thema des Einflusses von Microinteractions
          auf die User Experience: Eine Untersuchung unter Berücksichtigung
          psychologischer Aspekte der Wahrnehmung und intuitiven Interaktion
        </div>
      </div>

      <div>
        <span className="mt-4 font-bold">Informationen zum Test</span>
        <ul className="w-full list-disc pl-5 text-sm font-normal space-y-2">
          <li className="mt-2">
            Die einzelnen Aufgaben, die zu erledigen sind, findest du unten
            rechts im ausklappbaren Menü:
            <img src={Menu} width={"40"} />
          </li>
          <li>
            Wenn du unten auf den Button "Test starten" drückst, wirst du
            zufällig in eine Testgruppe zugewiesen. Gruppe A bekommt die Version
            "Mit Microinteractions" und Gruppe B die Version "Ohne
            Microinteractions".
          </li>
          <li>
            Nachdem du alle Aufgaben erledigt hast, fülle bitte das Formular
            aus, dass du auch im Aufklappmenü findest.
          </li>
          <li className="space-y-2">
            <p>
              Wir verwenden PostHog zur Erfassung anonymisierter Nutzungsdaten,
              um das Verhalten der User während der Nutzung zu analysieren.
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
        </ul>
      </div>

      <div className="mt-6">
        <RandomizeAppState disabled={!isChecked} />
      </div>
    </div>
  );
};

export default Start;
