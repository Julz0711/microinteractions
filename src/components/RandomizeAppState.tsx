import React from "react";
import { useDispatch } from "react-redux";
import { setHasMicrointeractions } from "../store/reducer";
import { useNavigate } from "react-router-dom";

const RandomizeAppState: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const randomizeMicrointeractions = () => {
    const randomValue = Math.random() >= 0.5;
    dispatch(setHasMicrointeractions(randomValue));
    navigate("/login");
  };

  return (
    <button
      onClick={randomizeMicrointeractions}
      className="bg-red w-full hover:bg-purple font-bold duration-150 text-white px-6 py-4 rounded-md cursor-pointer"
    >
      Test starten
    </button>
  );
};

export default RandomizeAppState;
