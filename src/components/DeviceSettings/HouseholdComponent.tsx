import { useState, useEffect } from 'react';
import DynamicIcon from '../DynamicIcon';
import { Slider } from '../Slider/Slider';
import styles from './HouseholdComponent.module.css';
import { twMerge } from 'tailwind-merge';
import Button from '../Button';
import Roomba from '../SVGAnimations/Roomba/Roomba';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';

export interface IHouselComponentProps {
  isOn: boolean;
}

const HouseholdComponent = (props: IHouselComponentProps) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (props.isOn) {
      const interval = setInterval(() => {
        setAnimatedValue((prev) => (prev < 100 ? prev + 1 : 100));
      }, 600);
      return () => clearInterval(interval);
    } else {
      setAnimatedValue(0);
    }
  }, [props.isOn]);

  const wrapper =
    'rounded-md bg-light shadow-2xl px-4 pt-3 pb-1 flex flex-col items-center justify-center grow';
  const meta =
    'text-uwu text-xs flex flex-row items-center gap-2 font-bold leading-2';
  const content = twMerge(
    'text-[2.25rem] font-bold',
    props.isOn ? 'text-blue' : 'text-dark'
  );
  return (
    <div className="flex flex-col items-center justify-center gap-16 w-4/5 mx-auto">
      <div className="relative h-50 w-50  rounded-full">
        <Roomba
          isActive={props.isOn}
          size={200}
          hasOnOff={false}
          color="text-blue"
        />
        {!props.isOn && (
          <div
            className={twMerge(
              'absolute inset-0 flex flex-col gap-2 items-center justify-center z-90',
              hasMicrointeractions && 'animate-pulse'
            )}
          >
            <DynamicIcon color={'text-yellow'} iconName={'Bolt'} size="48" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-6 items-center justify-around w-full">
          <div className={wrapper}>
            <span className={meta}>
              <DynamicIcon
                color={props.isOn ? 'text-uwu' : 'text-yellow'}
                iconName={'Bolt'}
                size="14"
              />{' '}
              Batterie
            </span>
            <span className={content}>76%</span>
          </div>
          <div className={wrapper}>
            <span className={meta}>
              <DynamicIcon iconName={'Trash'} size="14" /> Batterie
            </span>
            <span className={content}>34%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          {props.isOn ? (
            <>
              {hasMicrointeractions ? (
                <>
                  <Slider
                    className={styles.solid}
                    hasGradient={false}
                    isHorizontal={true}
                    size={'100'}
                    clickable={false}
                    value={hasMicrointeractions ? animatedValue : 45}
                    onChange={() => undefined}
                  />
                  <span className="text-blue font-bold">
                    {hasMicrointeractions
                      ? `${animatedValue}% abgeschlossen`
                      : '45%'}
                  </span>
                </>
              ) : (
                <div className="text-blue font-bold mt-2">
                  Gerät ist unterwegs
                </div>
              )}
            </>
          ) : (
            <Button
              label={'Route bearbeiten'}
              style={'bg-light hover:bg-dark/10 text-dark! shadow-xl'}
              link={''}
            ></Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseholdComponent;
