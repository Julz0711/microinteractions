import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import { twMerge } from "tailwind-merge";
import DynamicIcon from "./DynamicIcon";

type Props = {
  leftIcon?: React.ReactNode;
  headline: string;
  metaDescription: string;
  rightIcon?: React.ReactNode;
  rightIconBg?: boolean;
  rightIconLink?: string;
  leftIconClick?: () => void;
};

export const TopContextBar = ({
  leftIcon,
  leftIconClick,
  headline,
  metaDescription,
  rightIcon,
  rightIconBg = false,
  rightIconLink = undefined,
}: Props) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="sticky bg-light pb-2 z-10 w-full left-0 top-0 items-center pt-8">
      <div className="relative flex flex-col py-1 items-center">
        {leftIcon ? (
          <button
            onClick={leftIconClick ? leftIconClick : goBack}
            className="absolute left-0 top-0 flex items-center justify-center p-2 bg-dark rounded-md w-12 h-12 text-light cursor-pointer"
          >
            <div>
              {typeof leftIcon === "string" && (
                <DynamicIcon iconName={leftIcon} size={"20"} />
              )}
            </div>
          </button>
        ) : null}

        <div className="text-lg font-bold">{headline}</div>
        <p className="text-meta text-gray-500">{metaDescription}</p>
        {rightIcon ? (
          <button
            onClick={() => {
              if (rightIconLink) {
                navigate(rightIconLink);
              }
            }}
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
