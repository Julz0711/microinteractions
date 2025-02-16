import { useState } from "react";
import DynamicIcon from "./DynamicIcon";
import { twMerge } from "tailwind-merge";
import { AppState } from "../store/store";
import { useSelector } from "react-redux";

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
}) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    blur(e);
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        {hasMicrointeractions ? (
          <div
            className={`absolute transform duration-150 pointer-events-none ${
              value || isFocused
                ? "top-2 text-xs font-bold opacity-100"
                : "top-1/2 font-normal opacity-50 -translate-y-1/2"
            } ${isFocused ? "text-purple" : "text-uwu"} ${
              hasIcon ? "pl-12" : "pl-4"
            }`}
          >
            {placeholder}
          </div>
        ) : (
          <div
            className={twMerge(
              "absolute top-1/2 -translate-y-1/2 pointer-events-none text-uwu font-regular",
              hasIcon ? "pl-12" : "pl-4",
              isFocused || value ? "opacity-0" : "opacity-100"
            )}
          >
            {placeholder}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={change}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          required
          className={twMerge(
            `w-full pl-12 pr-4 ring-2 bg-inactive duration-150 font-regular border-none rounded-md focus:outline-none focus:ring-4 focus:ring-purple`,
            hasIcon ? "pl-12" : "pl-4",
            hasMicrointeractions
              ? twMerge(
                  !error && value ? "ring-green" : "ring-uwu",
                  isFocused || value ? "font-bold pt-6 pb-2" : "py-4",
                  error && "ring-red"
                )
              : twMerge("py-4", "ring-uwu")
          )}
        />
        {hasIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <DynamicIcon
              iconName={icon || "defaultIcon"}
              size="20"
              color={twMerge(isFocused ? "text-purple" : "text-dark")}
            />
          </div>
        )}
        {hasMicrointeractions && hasIcon && !error && value && (
          <div className="absolute text-green inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {/* lottie?? */}
            <DynamicIcon iconName={"Check"} size={"24"} />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 pl-2 text-[0.75rem] text-red font-bold">{error}</p>
      )}
    </div>
  );
};

export default InputField;
