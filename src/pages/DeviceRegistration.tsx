import React, { useState } from "react";
import { TopContextBar } from "../components/TopContextBar";
import InputField from "../components/InputField";
import Homepod from "../assets/img/homepod.png";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "../components/DynamicIcon";
import { AppState } from "../store/store";
import { useSelector } from "react-redux";
import {
  getColor,
  getAllCategoryNames,
  getAllRoomNames,
} from "../helpers/helpers";
import StepProgress from "../components/StepProgress";
import { Category } from "../types/dashboard.types";
import Lottie from "react-lottie";
import confettiAnimation from "../assets/lottie/confetti.json";
import { useNavigate } from "react-router-dom";
import EmblaCarousel from "../components/EmblaCarousel/js/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { AnimatePresence, motion } from "framer-motion";

const IntroText = ({ header, desc }: { header: string; desc: string }) => {
  return (
    <div className="text-center w-4/5">
      <h1>{header}</h1>
      <p>{desc}</p>
    </div>
  );
};

const DeviceRegistration = () => {
  const navigate = useNavigate();
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");

  const categoryNames = getAllCategoryNames();
  const roomNames = getAllRoomNames();

  const [formData, setFormData] = useState<{
    deviceName: string;
    category: Category;
    room: string;
  }>({
    deviceName: "",
    category: categoryNames[0] as Category,
    room: roomNames[0],
  });

  const categoryColor = formData.category
    ? getColor(formData.category)
    : "bg-dark";

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);

  const handleCategoryClick = (index: number, category: string) => {
    setActiveCategoryIndex(index);
    handleSelect("category", category);
  };

  const handleRoomClick = (index: number, room: string) => {
    setActiveRoomIndex(index);
    handleSelect("room", room);
  };

  const OPTIONS: EmblaOptionsType = { dragFree: true };
  const CATEGORY_SLIDES = getAllCategoryNames().map((category, index) => (
    <button
      key={index}
      className={twMerge(
        "w-full rounded-md cursor-pointer px-6 py-4 font-bold duration-300",
        activeCategoryIndex === index
          ? twMerge(categoryColor, "text-light")
          : "bg-inactive text-dark"
      )}
      onClick={() => handleCategoryClick(index, category)}
    >
      {category}
    </button>
  ));

  const ROOM_SLIDES = getAllRoomNames().map((room, index) => (
    <button
      key={index}
      className={twMerge(
        "w-full rounded-md cursor-pointer px-6 py-4 font-bold duration-300",
        activeRoomIndex === index
          ? "bg-dark text-light"
          : "bg-inactive text-dark"
      )}
      onClick={() => handleRoomClick(index, room)}
    >
      {room}
    </button>
  ));

  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() === "") {
      setError("Dieses Feld darf nicht leer sein.");
    } else {
      setError("");
    }
  };

  const clearInput = (field: string) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
    setError("Dieses Feld darf nicht leer sein.");
  };

  const handleSelect = (field: keyof typeof formData, item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "category" ? (item as Category) : item,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-4 items-center">
            <IntroText
              header={"Gerätename"}
              desc={
                "Benutze den vorgegebenen Namen oder erstelle einen eigenen"
              }
            />
            <div className="relative w-3/4">
              <InputField
                type="text"
                name="deviceName"
                placeholder="Gerätename"
                value={formData.deviceName}
                change={handleChange}
                blur={() => {}}
                hasIcon={false}
                error={error}
              />
              {hasMicrointeractions
                ? formData.deviceName && (
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-uwu cursor-pointer"
                      onClick={() => clearInput("deviceName")}
                    >
                      <DynamicIcon iconName="Close" size="24" />
                    </button>
                  )
                : null}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full flex flex-col gap-4 items-center">
            <IntroText
              header={"Kategorie"}
              desc={"Zu welcher Kategorie gehört Dein Gerät? "}
            />
            {/*
              <Scrolldown
                color={categoryColor}
                items={getAllCategoryNames()}
                onSelect={(item: string) => handleSelect("category", item)}
              />
            */}
            <EmblaCarousel
              width="flex-[0_0_auto]"
              slides={CATEGORY_SLIDES}
              options={OPTIONS}
            />
          </div>
        );
      case 3:
        return (
          <div className="w-full flex flex-col gap-4 items-center">
            <IntroText
              header={"Raumauswahl"}
              desc={"In welchem Raum befindet sich dein Gerät?"}
            />
            {/*
              <Scrolldown
                color={"bg-dark"}
                items={getAllRoomNames()}
                onSelect={(item: string) => handleSelect("room", item)}
              />
              */}
            <EmblaCarousel
              width="flex-[0_0_auto]"
              slides={ROOM_SLIDES}
              options={OPTIONS}
            />
          </div>
        );
      case 4:
        return (
          <div className="w-full flex flex-col gap-4 items-center">
            <IntroText
              header={"Übersicht"}
              desc={"Überprüfe deine Angaben bitte erneut."}
            />
            <table className="w-3/4 table-auto border-separate border-spacing-x-4 border-spacing-y-2">
              <tbody>
                <tr>
                  <td className="text-right text-meta">Name</td>
                  <td className="text-left font-bold text-xl">
                    {formData.deviceName}
                  </td>
                </tr>
                <tr className="p-4">
                  <td className="text-right text-meta">Kategorie</td>
                  <td className="text-left font-bold text-xl">
                    {formData.category}
                  </td>
                </tr>
                <tr className="p-4">
                  <td className="text-right text-meta">Raum</td>
                  <td className="text-left font-bold text-xl">
                    {formData.room}
                  </td>
                </tr>
              </tbody>
            </table>
            <p></p>
          </div>
        );
      case 5:
        return (
          <div className="w-full flex flex-col gap-8 items-center">
            <div className="absolute top-0 mx-auto pointer-events-none">
              {hasMicrointeractions && (
                <Lottie
                  options={{
                    loop: false,
                    autoplay: true,
                    animationData: confettiAnimation,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={600}
                  width={600}
                />
              )}
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="text-[3rem] font-bold text-green">Geschafft!</div>
              <div>Dein Gerät wurde erfolgreich hinzugefügt.</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="h-full flex flex-col justify-between gap-8 no-scrollbar">
      {currentStep < 5 ? (
        <>
          <TopContextBar
            leftIcon={"ChevronLeft"}
            leftIconClick={currentStep > 1 ? handleBack : undefined}
            headline={"Gerät gefunden"}
            metaDescription={"Neues Gerät hinzufügen"}
          />
          <div className="flex flex-col items-center gap-8 h-full">
            <div
              className={twMerge(
                "p-4 rounded-lg grow-0 flex flex-col items-center gap-0 duration-300",
                currentStep === 1 ? "bg-inactive" : categoryColor,
                !formData.category && "bg-uwu"
              )}
            >
              <img src={Homepod} className="w-2/3"></img>
              {currentStep > 1 && (
                <div className="w-full text-center font-bold text-light">
                  {formData.deviceName}
                </div>
              )}
            </div>
            {hasMicrointeractions && (
              <div className="w-full">
                <StepProgress currentStep={currentStep} />
              </div>
            )}
            <div className="w-full flex flex-col justify-between grow gap-8">
              <div className="grow flex items-center justify-center">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.div
                    key={currentStep}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={direction}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full flex flex-col items-center"
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="grow-0">
                {currentStep < 4 ? (
                  <button
                    className="btn-full bg-red hover:bg-purple"
                    onClick={handleNext}
                    disabled={formData.deviceName.trim() === ""}
                  >
                    Weiter
                  </button>
                ) : currentStep === 4 ? (
                  <button
                    className="btn-full bg-green hover:bg-blue"
                    onClick={handleNext}
                  >
                    Gerät hinzufügen
                  </button>
                ) : (
                  <button
                    className="btn-full bg-dark hover:bg-dark/70"
                    onClick={handleNext}
                  >
                    Zum Dashboard
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col justify-center items-center gap-16 py-5 overflow-y-scroll no-scrollbar">
          <div
            className={twMerge(
              "p-4 rounded-lg w-64 grow-0 flex flex-col items-center gap-0",
              categoryColor
            )}
          >
            <img src={Homepod} className="w-2/3"></img>
            {currentStep > 1 && (
              <div className="w-full text-center font-bold text-light">
                {formData.deviceName}
              </div>
            )}
          </div>
          {renderStep()}
          <button className="btn-xl" onClick={() => navigate("/")}>
            Zum Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default DeviceRegistration;

{
  /*
  Microinteractions
  Submit
  Back to Dashboard
  "*/
}
