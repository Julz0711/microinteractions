import { twMerge } from 'tailwind-merge';
import DynamicIcon from '../DynamicIcon';
import { getColor } from '../../helpers/helpers';
import { Category } from '../../types/dashboard.types';
import { setIsOn } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';

export interface IButtonProps {
  category: Category;
  isOn: boolean;
}

const OnOffButton = (props: IButtonProps) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const dispatch = useDispatch();
  const buttonColor = getColor(props.category);

  const handleClick = () => {
    dispatch(setIsOn(!props.isOn));
  };

  return (
    <button
      className={twMerge(
        hasMicrointeractions ? 'duration-150' : '',
        'mb-8 p-5 shadow-2xl rounded-full cursor-pointer',
        props.isOn
          ? `${buttonColor} hover:bg-dark text-light`
          : 'bg-light/50 hover:bg-light text-dark'
      )}
      onClick={handleClick}
    >
      <DynamicIcon iconName="OnOff" size={'40'} />
    </button>
  );
};

export default OnOffButton;
