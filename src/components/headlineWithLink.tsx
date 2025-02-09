import React from "react";
import DynamicIcon from "./DynamicIcon";
import { Link } from "react-router-dom";

interface HeadlineProps {
  headline: string;
  link: string;
}

const HeadlineWithLink: React.FC<HeadlineProps> = ({ headline, link }) => {
  return (
    <Link to={link} className="hover:text-uwu">
      <h2 className="text-h2">
        <span className="flex flex-row items-center gap-1">
          {headline}
          <DynamicIcon iconName="bluetooth" size="text-icon-sm" />
        </span>
      </h2>
    </Link>
  );
};

export default HeadlineWithLink;
