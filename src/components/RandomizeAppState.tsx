import { useDispatch } from "react-redux";
import { setHasMicrointeractions } from "../store/reducer";
import { useNavigate } from "react-router-dom";

type RandomizerProps = {
  disabled: boolean;
};

const RandomizeAppState = (props: RandomizerProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const randomizeMicrointeractions = () => {
    const randomValue = Date.now() % 2 === 0;
    dispatch(setHasMicrointeractions(randomValue));
    navigate("/login");
  };

  return (
    <button
      onClick={randomizeMicrointeractions}
      className="bg-red w-full hover:bg-purple font-bold duration-150 text-white px-6 py-4 rounded-md cursor-pointer disabled:bg-uwu disabled:text-inactive disabled:cursor-not-allowed"
      disabled={props.disabled ? true : false}
    >
      Test starten
    </button>
  );
};

export default RandomizeAppState;
