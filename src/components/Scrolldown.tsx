import { useState } from 'react';

type Props = {
  items: string[];
  onSelect: (item: string) => void;
};

const Scrolldown = ({ items, onSelect }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onSelect(items[index]);
  };

  return (
    <div className="h-24 overflow-y-scroll flex flex-col items-center scroll-smooth w-full">
      <div className="flex flex-col items-center w-full">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-2 text-center w-full rounded-sm cursor-pointer ${
              index === activeIndex ? 'bg-uwu' : 'bg-light'
            }`}
            onClick={() => handleClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scrolldown;
