import RandomizeAppState from "../components/RandomizeAppState";
import Menu from "../assets/img/menu.png";

type StartProps = {};

const Start = (props: StartProps) => {
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
        </ul>
      </div>

      <div className="mt-6">
        <RandomizeAppState />
      </div>
    </div>
  );
};

export default Start;
