import { motion } from "framer-motion";
import { AppState } from "../store/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

type Props = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export const NewButton = ({ isMenuOpen, toggleMenu }: Props) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const buttonOptions = [
    { label: "Raum", link: "/neuer-raum" },
    { label: "Gerät", link: "/neues-geraet" },
    { label: "Szene", link: "/neue-scene" },
    { label: "Zeitplan", link: "/neuer-zeitplan" },
  ];
  const buttonVariants = {
    hidden: (index: number) => ({
      scaleX: 0.5,
      scaleY: 0.5,
      y: 60,
      x: index === 0 ? 120 : index === 1 ? 40 : index === 2 ? -40 : -120,
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
    <>
      <button
        onClick={toggleMenu}
        className={`font-bold shadow-[0_0_48px_rgba(0,0,0,0.5)] z-60 relative bg-dark text-light px-6 py-4 rounded-md transition cursor-pointer duration-150  ${
          isMenuOpen ? "bg-dark hover:bg-dark" : "bg-red hover:bg-purple"
        }`}
      >
        New
      </button>
      {isMenuOpen && (
        <div className="z-50 absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
          {buttonOptions.map((option, index) => (
            <Link to={option.link} key={index} onClick={toggleMenu}>
              <motion.button
                custom={index}
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                className="bg-red font-bold text-light px-4 py-3 rounded-md cursor-pointer hover:bg-purple"
              >
                {option.label}
              </motion.button>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
