import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom

type Props = {
  icon: React.ReactNode;
  headline: string;
  metaDescription: string;
  rightIcon?: boolean;
};

export const TopContextBar = ({
  icon,
  headline,
  metaDescription,
  rightIcon = false,
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
            {"<"}
            {icon}
          </div>
        </button>
        <h1 className="text-lg font-bold">{headline}</h1>
        <p className="text-meta text-gray-500">{metaDescription}</p>
        {rightIcon && (
          <button className="absolute right-0 top-0 flex items-center justify-center p-2 bg-dark rounded-md w-12 h-12 text-light cursor-pointer">
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};
