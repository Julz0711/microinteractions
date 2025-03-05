import { ReactSVG } from 'react-svg';
import GlowBoyz from './GlowBoyz';
import DottedArrowDown from '../assets/img/DottedArrow.svg';
import AnimatedArrow from './SVGAnimations/AnimatedArrow/AnimatedArrow';
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';

export function NoDevicesPlaceholder() {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  return (
    <div className="w-4/5 mx-auto flex flex-col gap-1 pt-12 justify-center items-center">
      <div className="pt-8">
        <GlowBoyz isGray={true} />
      </div>
      <div className="text-lg font-bold mt-8">
        Noch keine Geräte registriert
      </div>
      <p className="text-center">
        Bitte füge dein erstes Gerät zu einem Raum hinzu.
      </p>
      <div className="pl-16">
        {hasMicrointeractions ? (
          <AnimatedArrow />
        ) : (
          <ReactSVG
            src={DottedArrowDown}
            className="mt-4"
            beforeInjection={(svg) => {
              svg.setAttribute('style', `height: 160px`);
              svg.querySelectorAll('path').forEach((path) => {
                path.setAttribute('fill', 'var(--color-uwu)');
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
