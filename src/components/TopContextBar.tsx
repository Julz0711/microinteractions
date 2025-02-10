import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import { twMerge } from "tailwind-merge";
import DynamicIcon from "./DynamicIcon";

type Props = {
  leftIcon: React.ReactNode;
  headline: string;
  metaDescription: string;
  rightIcon: React.ReactNode;
  rightIconBg?: boolean;
};

export const TopContextBar = ({
  leftIcon,
  headline,
  metaDescription,
  rightIcon,
  rightIconBg = false,
}: Props) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="z-90 w-full left-0 top-0 items-center pt-8">
      <div className="relative flex flex-col py-1 items-center">
        <button
          onClick={goBack}
          className="absolute left-0 top-0 flex items-center justify-center p-2 bg-dark rounded-md w-12 h-12 text-light cursor-pointer"
        >
          <div>
            {typeof rightIcon === "string" && (
              <DynamicIcon iconName={rightIcon} size={"20"} />
            )}
          </div>
        </button>
        <h1 className="text-lg font-bold">{headline}</h1>
        <p className="text-meta text-gray-500">{metaDescription}</p>
        {rightIcon ? (
          <button
            className={twMerge(
              "absolute right-0 top-0 flex items-center justify-center p-2 rounded-md w-12 h-12 cursor-pointer",
              rightIconBg ? "bg-dark text-light" : "text-uwu"
            )}
          >
            {typeof rightIcon === "string" && (
              <DynamicIcon iconName={rightIcon} size={"20"} />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
};
