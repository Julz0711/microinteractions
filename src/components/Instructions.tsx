import { useEffect, useState } from 'react';
import DynamicIcon from './DynamicIcon';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppState } from '../store/store';
import { twMerge } from 'tailwind-merge';

export function Instructions() {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const location = useLocation();

  const initializeCheckboxes = () => {
    const savedCheckboxes = localStorage.getItem('checkboxes');
    return savedCheckboxes
      ? JSON.parse(savedCheckboxes)
      : {
          quest1: false,
          quest2: false,
          quest3: false,
          quest4: false,
          quest5: false,
          quest6: false
        };
  };

  const [isOpen, setIsOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState(initializeCheckboxes);

  useEffect(() => {
    localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
  }, [checkboxes]);

  const handleClickMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes: any) => ({
      ...prevCheckboxes,
      [name]: checked
    }));
  };

  const labelClass = 'ml-1';
  return (
    <>
      <button
        className={twMerge(
          'bottom-12 left-[-1px] z-[999] fixed p-2 bg-uwu border',
          isOpen && 'rotate-180'
        )}
        onClick={handleClickMenu}
      >
        <DynamicIcon iconName="ChevronRight" />
      </button>
      {isOpen && (
        <div className="fixed bg-[#ffffff] border z-[999] bottom-12 left-10 flex overflow-y-auto h-96">
          <div className=" p-4 flex flex-col gap-4 max-w-80">
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
              <input
                type="checkbox"
                id="quest4"
                name="quest4"
                checked={checkboxes.quest4}
                onChange={handleCheckboxChange}
              />
              <label className={labelClass} htmlFor="quest4">
                Reduziere die Helligkeit und Farbtemperatur einer Lampe aus dem
                Wohnzimmer. Schalte sie andschließend aus.
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
                Stelle einen Ventilator im Schlafzimmer auf volle Stärke und
                stelle einen Timer von 4h.
              </label>
              <br />
              <input
                type="checkbox"
                id="quest7"
                name="quest7"
                checked={checkboxes.quest7}
                onChange={handleCheckboxChange}
              />
              <label className={labelClass} htmlFor="quest7">
                Gehe im Flur zur Kategorie Haushalt und starte den
                Staubsaugerroboter.
              </label>
              <br />
              <input
                type="checkbox"
                id="quest8"
                name="quest8"
                checked={checkboxes.quest8}
                onChange={handleCheckboxChange}
              />
              <label className={labelClass} htmlFor="quest8">
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
              <label className={labelClass} htmlFor="quest9">
                Gehe zur Geräteübersicht und entferne eine Leselampe im
                Wohnzimmer.
              </label>
              <br />
              <input
                type="checkbox"
                id="quest10"
                name="quest10"
                checked={checkboxes.quest10}
                onChange={handleCheckboxChange}
              />
              <label className={labelClass} htmlFor="quest10">
                Gehe zum Dashboard und aktiviere/deaktiviere eine
                Szene/Favorit/Zeitplan Deiner Wahl.
              </label>
              <br />
            </form>
            Nach Abschließen aller Aufgaben: <br />
            Bearbeite diesen kurzen Fragebogen. <br />
            Dieser dauert nur ca. 3-5 Minuten.
            <a
              className={'text-blue hover:text-dark font-bold underline pb-4'}
              target={location.pathname !== '/start' ? '_blank' : ''}
              href={
                location.pathname !== '/start'
                  ? hasMicrointeractions
                    ? 'https://docs.google.com/forms/d/e/1FAIpQLSehxLLLh23hDtWpfjFUr3wb91Ag9vWfbxqTaJZScyHoY2aVzg/viewform?usp=header'
                    : 'https://docs.google.com/forms/d/e/1FAIpQLSfvJRa_eK9Eb5cLGayQy1nwPT_mzbcViHQMTPxYZ4AaYADP4Q/viewform?usp=header'
                  : undefined
              }
              rel="noreferrer"
            >
              Zum Usability Test
            </a>
            {location.pathname !== '/start' && (
              <>
                <hr />
                <div className="py-4">
                  <a
                    href="/login"
                    className="font-bold text-uwu text-sm hover:text-dark"
                  >
                    Gibt es Probleme? Neu starten
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
