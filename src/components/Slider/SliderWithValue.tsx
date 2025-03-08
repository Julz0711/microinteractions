import { Slider } from './Slider';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import './Slider.css';
import { twMerge } from 'tailwind-merge';

type Props = {
  step: number;
  value: number;
  measure: string;
  hasExtraMeasurements?: number;
  custom?: string;
  onChange: (value: number) => void;
};

const SliderWithValue = (props: Props) => {
  const { hasMicrointeractions, isOn } = useSelector(
    (state: AppState) => state.app
  );

  const handleSliderChange = (value: number) => {
    const newValue = Math.round(
      value / props.step + (props.hasExtraMeasurements ?? 0)
    );
    props.onChange(newValue);
  };

  return (
    <div className="w-full flex flex-row gap-2">
      <div className="w-full grow relative">
        <Slider
          className={props.custom}
          hasGradient={false}
          isHorizontal={true}
          isPx={false}
          size={'100'}
          value={props.value}
          step={props.step}
          clickable={true}
          onChange={handleSliderChange}
        />
        {hasMicrointeractions && (
          <div className="flex justify-start items-center w-full absolute top-0 left-0 h-full pointer-events-none overflow-hidden">
            {Array.from(
              { length: Math.floor(100 / props.step) },
              (_, index) => (
                <div
                  key={index}
                  className="h-[51px] -translate-y-[3px] w-[2px] bg-green/20 "
                  style={
                    props.step === 33.333
                      ? {
                          transform:
                            'translateX(' +
                            (17 +
                              (props.step + 2.7) * index +
                              (20 / props.step) * index) +
                            'px)'
                        }
                      : {
                          transform:
                            'translateX(' +
                            (17 +
                              props.step * index +
                              (20 / props.step) * index) +
                            'px)'
                        }
                  }
                />
              )
            )}
          </div>
        )}
      </div>
      <div
        className={twMerge(
          'sliderValue h-12 w-20 max-w-24 flex items-center justify-center rounded-md text-dark font-bold shadow-2xl',
          isOn ? 'bg-light' : 'bg-dark/20'
        )}
      >
        {props.value}
        {props.measure}
      </div>
    </div>
  );
};

export default SliderWithValue;
