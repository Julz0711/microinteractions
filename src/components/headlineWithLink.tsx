import React from "react";
import DynamicIcon from "./dynamicIcon";
import { Link } from "react-router-dom";

interface HeadlineProps {
  headline: string;
  link: string;
}

const HeadlineWithLink: React.FC<HeadlineProps> = ({ headline, link }) => {
  return (
    <Link to={link}>
      <h2 className="text-h2">
        <span className="flex flex-row items-center gap-1">
          {headline}
          <DynamicIcon iconName="FaChevronRight" size="text-icon-sm" />
        </span>
      </h2>
    </Link>
  );
};

export default HeadlineWithLink;
