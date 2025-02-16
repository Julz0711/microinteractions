import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { IosPickerItem } from "./EmblaCarouselPickerItem";
import "../css/embla.css";

type PropType = {
  loop?: EmblaOptionsType["loop"];
};

const EmblaPicker: React.FC<PropType> = (props) => {
  const { loop } = props;

  return (
    <div className="picker">
      <IosPickerItem slideCount={24} perspective="left" loop={loop} />
    </div>
  );
};

export default EmblaPicker;
