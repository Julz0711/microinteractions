import React from 'react';
import DynamicIcon from './DynamicIcon';
import { Link } from 'react-router-dom';

interface HeadlineProps {
  headline: string;
  link: string;
}

const HeadlineWithLink: React.FC<HeadlineProps> = ({ headline, link }) => {
  return (
    <Link to={link} className="hover:text-uwu">
      <h2 className="text-h2">
        <span className="flex flex-row items-center">
          {headline}
          <DynamicIcon iconName="ChevronRight" size="16" />
        </span>
      </h2>
    </Link>
  );
};

export default HeadlineWithLink;
