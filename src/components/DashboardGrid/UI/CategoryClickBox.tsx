import { twMerge } from "tailwind-merge";

export interface ICategoryClickBoxProps {
  handleClick: () => void;
  active: boolean;
  flexClasses: string;
}

export function CategoryClickBox(props: ICategoryClickBoxProps) {
  return (
    <button
      onClick={props.handleClick}
      className={twMerge("w-full h-full absolute z-10", props.flexClasses)}
    />
  );
}
