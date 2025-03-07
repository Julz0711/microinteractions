import { twMerge } from "tailwind-merge";
import RoombaIcon from "../../../assets/icons/Roomba.svg";
import DynamicIcon from "../../DynamicIcon";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";

type RoombaProps = {
  isActive: boolean;
  size: number;
  color?: string;
  hasOnOff?: boolean;
};

const Roomba = (props: RoombaProps) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  return (
    <div className="relative" style={{ width: props.size, height: props.size }}>
      <div
        className={twMerge(
          "z-[2] bg-none absolute rounded-full",
          props.isActive ? "shadow-xl" : "shadow-2xl"
        )}
      >
        <img src={RoombaIcon} width={props.size} height={props.size}></img>
      </div>
      {props.hasOnOff && (
        <div
          className={
            "absolute z-[2] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-xl p-1"
          }
        >
          <DynamicIcon
            iconName={"OnOff"}
            color={twMerge(props.isActive ? "text-green" : "text-dark")}
            size={(props.size / 6).toString()}
          />
        </div>
      )}
      <div
        className={twMerge(
          props.isActive
            ? "left-0 top-0 transform -translate-x-2 -translate-y-2"
            : "top-0 left-0 transform translate-x-8 translate-y-8",
          "absolute z-[1]",
          hasMicrointeractions && props.isActive
            ? "animate-spin-right"
            : "animate-none",
          hasMicrointeractions && "transition-transform duration-300"
        )}
      >
        <DynamicIcon
          iconName={"Feger"}
          color={props.color ? props.color : "text-dark"}
          size={(props.size / 2).toString()}
        />
      </div>
      <div
        className={twMerge(
          props.isActive
            ? "right-0 top-0 transform translate-x-2 -translate-y-2"
            : "top-0 right-0 -translate-x-8 translate-y-8",
          "absolute z-[1]",
          hasMicrointeractions && props.isActive
            ? "animate-spin-left"
            : "animate-none",
          hasMicrointeractions && "transition-transform duration-300"
        )}
      >
        <DynamicIcon
          iconName={"Feger"}
          color={props.color ? props.color : "text-dark"}
          size={(props.size / 2).toString()}
        />
      </div>
    </div>
  );
};

export default Roomba;
