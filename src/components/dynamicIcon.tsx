import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ReactSVG } from "react-svg";
import Close from "../../public/icons/Close.svg";

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
        const icon = await import(`../../public/icons/${iconName}.svg`);
        setIconUrl(icon.default);
      } catch (error) {
        console.error(`Icon ${iconName} not found`);
        setIconUrl(null);
      }
    };

    importIcon();
  }, [iconName]);

  return iconUrl ? (
    <ReactSVG src={iconUrl} className={twMerge(size, color)} />
  ) : (
    <ReactSVG src={Close} className={twMerge(size, color)} />
  );
};

export default DynamicIcon;
