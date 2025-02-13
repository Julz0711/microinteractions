import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ReactSVG } from "react-svg";
import Close from "../assets/icons/Close.svg";

interface DynamicIconProps {
  iconName: string;
  size?: string;
  color?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, size, color }) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  useEffect(() => {
    const importIcon = async () => {
      try {
        const icon = await import(`../assets/icons/${iconName}.svg`);
        setIconUrl(icon.default);
      } catch (error) {
        console.error(`Icon ${iconName} not found`);
        setIconUrl(null);
      }
    };

    importIcon();
  }, [iconName]);

  return iconUrl ? (
    <ReactSVG
      src={iconUrl}
      className={twMerge(size, color)}
      beforeInjection={(svg) => {
        svg.setAttribute("style", `width: ${size}; height: ${size};`);
        svg.setAttribute("fill", "currentColor");
        svg.querySelectorAll("path").forEach((path) => {
          path.setAttribute("fill", "currentColor");
        });
      }}
    />
  ) : (
    <ReactSVG src={Close} className={twMerge(size, color)} />
  );
};

export default DynamicIcon;
