import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ReactSVG } from "react-svg";

interface DynamicIconProps {
  iconName: string;
  size?: string;
  color?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  size = "24",
  color,
}) => {
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
      className={twMerge(color)}
      beforeInjection={(svg) => {
        svg.setAttribute("style", `width: ${size}px; height: ${size}px;`);
        svg.setAttribute("fill", "currentColor");
        svg.querySelectorAll("path").forEach((path) => {
          path.setAttribute("fill", "currentColor");
        });
      }}
    />
  ) : (
    <span
      className="loading loading-spinner text-uwu"
      style={{ height: parseInt(size), width: parseInt(size) }}
    ></span>
  );
};

export default DynamicIcon;
