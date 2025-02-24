import { ReactSVG } from "react-svg";
import Ellipse from "../../assets/img/EllipseCut.svg";
import DynamicIcon from "../DynamicIcon";
import { Slider } from "../Slider/Slider";
import styles from "./HouseholdComponent.module.css";
import { twMerge } from "tailwind-merge";
import Button from "../Button";

export interface IHouselComponentProps {
  isOn: boolean;
}

const HouseholdComponent = (props: IHouselComponentProps) => {
  const wrapper =
    "rounded-md bg-light shadow-2xl px-4 pt-3 pb-1 flex flex-col items-center justify-center grow";
  const meta =
    "text-uwu text-xs flex flex-row items-center gap-2 font-bold leading-2";
  const content = twMerge(
    "text-[2.25rem] font-bold",
    props.isOn ? "text-blue" : "text-dark"
  );
  return (
    <div className="flex flex-col items-center justify-center gap-16 w-4/5 mx-auto">
      <div
        className={twMerge(
          props.isOn ? "bg-blue" : "bg-light/50",
          "relative h-50 w-50  rounded-full shadow-2xl"
        )}
      >
        <ReactSVG
          src={Ellipse}
          beforeInjection={(svg) => {
            svg.classList.add("absolute", "inset-0", "w-48", "h-48");
          }}
        ></ReactSVG>
        {!props.isOn && (
          <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center">
            <DynamicIcon color={"text-yellow"} iconName={"Bolt"} size="48" />
            <span className="text-yellow font-bold text-xs">wird geladen</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-6 items-center justify-around w-full">
          <div className={wrapper}>
            <span className={meta}>
              <DynamicIcon
                color={props.isOn ? "text-uwu" : "text-yellow"}
                iconName={"Bolt"}
                size="14"
              />{" "}
              Batterie
            </span>
            <span className={content}>76%</span>
          </div>
          <div className={wrapper}>
            <span className={meta}>
              <DynamicIcon iconName={"Trash"} size="14" /> Batterie
            </span>
            <span className={content}>34%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          {props.isOn ? (
            <>
              <Slider
                className={styles.solid}
                hasGradient={false}
                isHorizontal={true}
                size={"100"}
                clickable={false}
                defaultValue={45}
                onChange={() => undefined}
              />
              <span className="text-blue font-bold">41% erledigt</span>
            </>
          ) : (
            <Button
              label={"Route bearbeiten"}
              style={"bg-light hover:bg-light/50 text-dark! shadow-xl"}
              link={""}
            ></Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseholdComponent;
