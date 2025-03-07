import { motion } from 'framer-motion';
import { AppState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Device } from '../../../types/types';
import { twMerge } from 'tailwind-merge';
import DynamicIcon from '../../DynamicIcon';
import { useButtonVariants } from '../../../Hooks/DeviceGrid/useButtonVariants';
import { useDeviceState } from '../../../Hooks/DeviceGrid/useDeviceState';
import { useDeviceAnimation } from '../../../Hooks/DeviceGrid/useDeviceAnimation';
import { getColor, getShadow, getTextColor } from '../../../helpers/helpers';
import { setIsOn } from '../../../store/reducer';

interface DeviceProps {
  device: Device;
  canvasRef: React.RefObject<HTMLDivElement>;
  index: number;
}

export const DeviceBox = ({ device, canvasRef, index }: DeviceProps) => {
  const { buttonVariants } = useButtonVariants({ canvasRef, index });
  const {
    buttonState,
    previousState,
    toggleActiveState,
    toggleMenuState,
    isDeviceActive,
    isMenuOpen
  } = useDeviceState({ buttonVariants, device });
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  const { scope } = useDeviceAnimation({
    buttonState,
    previousState,
    buttonVariants,
    index
  });
  const dispatch = useDispatch();

  const handleToggleMenuState = () => {
    toggleMenuState();
    dispatch(setIsOn(isDeviceActive));
  };

  return (
    <>
      <motion.div
        key={index}
        custom={index}
        ref={scope}
        initial={{
          scale: 0,
          opacity: 0,
          left: 120,
          top: 500 - Math.floor(index / 2) * 100
        }}
        variants={buttonVariants}
        className={twMerge(
          hasMicrointeractions
            ? isDeviceActive
              ? ' shadow-lg device-box-' +
                device.category.toLowerCase() +
                ' ' +
                getShadow(device.category)
              : 'shadow-xl device-box-dashboard-inactive'
            : isDeviceActive
            ? getColor(device.category).toLowerCase()
            : 'bg-inactive',
          'motion absolute gap-4 font-bold rounded-md select-none flex flex-col justify-center items-center px-4'
        )}
        onClick={() => {
          handleToggleMenuState();
        }}
      >
        {isMenuOpen && (
          <div className="text-light w-44 p-4">
            <div>{device.name}</div>
          </div>
        )}
        <div className="flex gap-2 justify-center flex-col items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleActiveState();
            }}
            className="flex bg-light p-2 justify-center items-center rounded-full overflow-hidden border-none  checked:bg-green"
          >
            <DynamicIcon
              iconName={'OnOff'}
              color={
                isDeviceActive ? getTextColor(device.category) : 'text-dark'
              }
            />
          </button>
          {buttonState === 'visible' && (
            <h3
              className={twMerge(
                'text-center text-[11px]',
                isDeviceActive ? 'text-light' : 'text-dark'
              )}
            >
              {device.name}
            </h3>
          )}
        </div>
      </motion.div>
    </>
  );
};
