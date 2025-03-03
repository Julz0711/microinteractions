import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "../css/embla.css";
import { twMerge } from "tailwind-merge";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  width?: string;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, width } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className={twMerge("embla__slide", width)} key={index}>
            <div className="embla__slide__number">{slide}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
