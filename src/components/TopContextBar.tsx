import React from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "./DynamicIcon";

type Props = {
  leftIcon?: React.ReactNode;
  headline: string;
  metaDescription: string;
  metaDescriptionDark?: boolean;
  rightIcon?: React.ReactNode;
  rightIconBg?: boolean;
  rightIconBgColour?: string;
  rightIconLink?: string;
  bg?: string;
  leftIconClick?: () => void;
};

export const TopContextBar = ({
  leftIcon,
  leftIconClick,
  headline,
  metaDescription,
  metaDescriptionDark = false,
  rightIcon,
  rightIconBg = false,
  rightIconBgColour,
  rightIconLink = undefined,
  bg,
}: Props) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={twMerge(
        bg,
        "sticky pb-2 z-10 w-full left-0 top-0 items-center pt-8"
      )}
    >
      <div className="relative flex flex-col py-1 items-center">
        {leftIcon ? (
          <button
            onClick={leftIconClick ? leftIconClick : goBack}
            className="absolute duration-150 left-0 top-0 flex items-center justify-center p-2 bg-dark hover:bg-dark/80 rounded-md w-12 h-12 text-light cursor-pointer"
          >
            <div>
              {typeof leftIcon === "string" && (
                <DynamicIcon iconName={leftIcon} size={"20"} />
              )}
            </div>
          </button>
        ) : null}

        <div className="text-lg font-bold">{headline}</div>
        <p
          className={twMerge(
            metaDescriptionDark
              ? "text-dark/80 font-bold text-xs"
              : "text-meta "
          )}
        >
          {metaDescription}
        </p>
        {rightIcon ? (
          <button
            onClick={() => {
              if (rightIconLink) {
                navigate(rightIconLink);
              }
            }}
            className={twMerge(
              "absolute duration-150 right-0 top-0 flex items-center justify-center p-2 rounded-md w-12 h-12 cursor-pointer",
              rightIconBg ? "text-dark" : "text-uwu",
              rightIconBgColour
                ? twMerge(rightIconBgColour, "text-light hover:bg-dark/70")
                : "bg-light hover:bg-light/50"
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
