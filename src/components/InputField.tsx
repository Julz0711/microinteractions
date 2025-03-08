import { useState } from 'react';
import DynamicIcon from './DynamicIcon';
import { twMerge } from 'tailwind-merge';
import { AppState } from '../store/store';
import { useSelector } from 'react-redux';

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  blur: (e: React.FocusEvent<HTMLInputElement>) => void;
  icon?: string;
  error?: string;
  hasIcon?: boolean;
  isSearch?: boolean;
  isValid?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  change,
  blur,
  icon,
  error,
  hasIcon = true,
  isSearch = false,
  isValid
}) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    blur(e);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        {hasMicrointeractions ? (
          <div
            className={`absolute transform duration-150 pointer-events-none ${
              value || isFocused
                ? 'top-2 text-[10px] font-bold opacity-100'
                : 'top-1/2 font-normal text-sm opacity-50 -translate-y-1/2'
            } ${isFocused ? 'text-purple' : 'text-uwu'} ${
              hasIcon ? 'pl-10' : 'pl-4'
            }`}
          >
            {placeholder}
          </div>
        ) : (
          <div
            className={twMerge(
              'absolute top-1/2 -translate-y-1/2 pointer-events-none text-uwu font-normal',
              hasIcon ? 'pl-10' : 'pl-4',
              isFocused || value ? 'opacity-0' : 'opacity-100'
            )}
          >
            {placeholder}
          </div>
        )}
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={change}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          className={twMerge(
            `w-full h-14 pl-12 pr-4 ring-2 bg-inactive duration-150 font-normal border-none rounded-md focus:outline-none focus:ring-4 focus:ring-purple`,
            hasIcon ? 'pl-10' : 'pl-4',
            hasMicrointeractions
              ? twMerge(
                  !error && value ? 'ring-green' : 'ring-uwu',
                  isFocused || value ? 'font-bold text-sm pt-6 pb-2' : 'py-3',
                  error && 'ring-red'
                )
              : twMerge('py-4', 'ring-uwu', error && 'ring-red')
          )}
        />
        {hasIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <DynamicIcon
              iconName={icon || 'defaultIcon'}
              size="20"
              color={twMerge(isFocused ? 'text-purple' : 'text-dark')}
            />
          </div>
        )}
        {type === 'password' && hasMicrointeractions && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={handleTogglePassword}
          >
            <DynamicIcon
              iconName={showPassword ? 'Eye_hide' : 'Eye'}
              size="20"
              color="text-dark"
            />
          </div>
        )}
        {type !== 'password' &&
        hasMicrointeractions &&
        hasIcon &&
        !isSearch &&
        !error &&
        value &&
        isValid ? (
          <div className="absolute text-green inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <DynamicIcon iconName={'Check'} size={'24'} />
          </div>
        ) : null}
      </div>

      {hasMicrointeractions && error && (
        <p className="mt-1 pl-2 text-[0.75rem] text-red font-bold">{error}</p>
      )}
    </div>
  );
};

export default InputField;
