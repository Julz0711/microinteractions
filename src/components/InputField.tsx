import { useState } from "react";
import DynamicIcon from "../components/DynamicIcon";
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
  icon: string;
  error?: string;
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
            className={`absolute pl-12 top-4 font-bold transform -translate-y-1/2 duration-150 ${
              value || isFocused ? "top-0 text-xs" : "hidden"
            } ${isFocused ? "text-purple" : "text-uwu"}`}
          >
            {placeholder}
          </div>
        ) : null}
        <input
          type={type}
          name={name}
          placeholder={!isFocused ? placeholder : ""}
          value={value}
          onChange={change}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          className={twMerge(
            `w-full pl-12 pr-4 ring-2 ring-uwu bg-inactive duration-150 font-regular border-none rounded-md focus:outline-none focus:ring-4 focus:ring-purple`,
            hasMicrointeractions
              ? twMerge(
                  !error && value ? "ring-green" : "ring-red",
                  isFocused || value ? "font-bold pt-6 pb-2" : "py-4"
                )
              : twMerge("py-4", error && "ring-red")
          )}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <DynamicIcon
            iconName={icon}
            size="20"
            color={twMerge(isFocused ? "text-purple" : "text-dark")}
          />
        </div>
        {hasMicrointeractions && !error && value && (
          <div className="absolute text-green inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {/* lottie?? */}
            <DynamicIcon iconName={"Check"} size={"24"} />
          </div>
        )}
      </div>

      {hasMicrointeractions && error && (
        <p className="mt-1 pl-2 text-[0.75rem] text-red font-bold">{error}</p>
      )}
    </div>
  );
};

export default InputField;
