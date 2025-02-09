import DynamicIcon from "./DynamicIcon";
import { motion } from "framer-motion";
import { AppState } from "../store/store";
import { useSelector } from "react-redux";

type Props = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export const NewButton = ({ isMenuOpen, toggleMenu }: Props) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const buttonOptions = ["Raum", "Gerät", "Szene"];
  const buttonVariants = {
    hidden: (index: number) => ({
      scaleX: 0.5,
      scaleY: 0.5,
      y: 60,
      x: index === 0 ? 80 : index === 2 ? -80 : 0,
    }),
    visible: (index: number) => ({
      scaleX: 1,
      scaleY: 1,
      y: -10,
      x: 0,
      transition: {
        duration: hasMicrointeractions ? 0.2 : 0,
        ease: "easeOut",
        delay: hasMicrointeractions ? index * 0.15 : 0,
      },
    }),
  };

  return (
    <div className="z-50 absolute font-alte-haas-bold left-[50%] translate-x-[-50%] bottom-12">
      <button
        onClick={toggleMenu}
        className={`z-60 relative bg-dark text-light px-6 py-4 rounded-md transition cursor-pointer duration-150  ${
          isMenuOpen ? "bg-dark hover:bg-dark" : "bg-red hover:bg-purple"
        }`}
      >
        New
      </button>
      {isMenuOpen && (
        <div className="z-50 absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
          {buttonOptions.map((option, index) => (
            <motion.button
              key={index}
              custom={index}
              initial={"hidden"}
              animate="visible"
              variants={buttonVariants}
              className="bg-red text-light px-4 py-3 rounded-md cursor-pointer hover:bg-purple"
            >
              {option}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};
