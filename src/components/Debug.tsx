import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHasMicrointeractions } from "../store/reducer";
import { AppState } from "../store/store";
import { twMerge } from "tailwind-merge";

const Debug = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  const hierarchy = useSelector((state: AppState) => state.app.hierarchy);
  const room = useSelector((state: AppState) => state.app.room);
  const category = useSelector((state: AppState) => state.app.category);
  const device = useSelector((state: AppState) => state.app.device);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className={twMerge(
          "fixed cursor-pointer border-2 border-uwu duration-150 top-4 left-4 bg-uwu font-bold hover:bg-dark hover:text-white text-dark px-4 py-3 rounded-md",
          isModalOpen ? "hidden" : "block"
        )}
      >
        Toggle Debug Menu
      </button>
      {isModalOpen && (
        <div className="fixed duration-150 top-4 left-4 z-[9999999]">
          <div className="px-6 py-5 bg-uwu/10 border-2 border-uwu rounded-md shadow-lg backdrop-blur-2xl">
            <div className="font-bold text-light mb-2">Debug Menu</div>
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => dispatch(setHasMicrointeractions(true))}
                className="font-bold bg-green-500 text-white border-2 border-green-500 px-4 py-2 rounded-md cursor-pointer hover:bg-transparent hover:text-green-500"
              >
                Enable MI
              </button>
              <button
                onClick={() => dispatch(setHasMicrointeractions(false))}
                className="font-bold bg-red-500 text-white border-2 border-red-500 px-4 py-2 rounded-md cursor-pointer hover:bg-transparent hover:text-red-500"
              >
                Disable MI
              </button>
            </div>
            <div className="font-bold text-light mb-2">App States</div>
            <div>
              <p className="text-light">
                hasMicrointeractions:{" "}
                <span
                  className={twMerge(
                    "font-bold",
                    hasMicrointeractions ? "text-green" : "text-red"
                  )}
                >
                  {hasMicrointeractions ? "true" : "false"}
                </span>
              </p>
              <p className="text-light">
                hierarchy: <span className="font-bold">{hierarchy}</span>
              </p>
              <p className="text-light">
                room: <span className="font-bold">{room}</span>
              </p>
              <p className="text-light">
                category:{" "}
                <span className="font-bold">
                  {category ? category : "none selected"}
                </span>
              </p>
              <p className="text-light">
                device:{" "}
                <span className="font-bold">
                  {device ? device.name : "none selected"}
                </span>
              </p>
            </div>
            <button
              onClick={toggleModal}
              className="cursor-pointer mt-6 border-2 border-uwu duration-150 top-4 left-4 bg-uwu font-bold hover:bg-dark hover:text-white text-dark px-4 py-3 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Debug;
