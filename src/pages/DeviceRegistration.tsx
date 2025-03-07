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
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  return (
    <div
      className={twMerge(
        "w-4/5 font-normal",
        hasMicrointeractions ? "text-center" : "text-left"
      )}
    >
      <h1 className="font-bold">{header}</h1>
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
          ? hasMicrointeractions
            ? twMerge(categoryColor, "text-light")
            : "bg-dark text-light"
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
            <div className="relative w-4/5">
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
            {hasMicrointeractions ? (
              <EmblaCarousel
                width="flex-[0_0_auto]"
                slides={CATEGORY_SLIDES}
                options={OPTIONS}
              />
            ) : (
              <div className="w-4/5 flex flex-col gap-2">
                {getAllCategoryNames().map((category, index) => (
                  <div key={index} className="font-bold w-full">
                    <input
                      type="radio"
                      id={`category-${index}`}
                      name="category"
                      value={category}
                      checked={activeCategoryIndex === index}
                      onChange={() => handleCategoryClick(index, category)}
                      className="mr-2 accent-red"
                    />
                    <label htmlFor={`category-${index}`} className="text-dark">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="w-full flex flex-col gap-4 items-center">
            <IntroText
              header={"Raumauswahl"}
              desc={"In welchem Raum befindet sich dein Gerät?"}
            />
            {hasMicrointeractions ? (
              <EmblaCarousel
                width="flex-[0_0_auto]"
                slides={ROOM_SLIDES}
                options={OPTIONS}
              />
            ) : (
              <div className="w-4/5 flex flex-col gap-2">
                {getAllRoomNames().map((room, index) => (
                  <div key={index} className="font-bold w-full">
                    <input
                      type="radio"
                      id={`room-${index}`}
                      name="room"
                      value={room}
                      checked={activeRoomIndex === index}
                      onChange={() => handleRoomClick(index, room)}
                      className="mr-2 accent-red"
                    />
                    <label htmlFor={`room-${index}`} className="text-dark">
                      {room}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 4:
        const tdl = twMerge(
          hasMicrointeractions
            ? "text-right text-meta font-normal"
            : "font-normal"
        );
        const tdr = twMerge(
          hasMicrointeractions ? "text-left font-bold text-xl" : "font-bold"
        );
        return (
          <div className="w-full flex flex-col gap-4 items-center">
            <IntroText
              header={"Übersicht"}
              desc={"Überprüfe deine Angaben bitte erneut."}
            />
            <table
              className={twMerge(
                "border-separate border-spacing-x-4 border-spacing-y-2",
                hasMicrointeractions ? "w-3/4" : "w-8/9"
              )}
            >
              <tbody>
                <tr>
                  <td className={tdl}>Name</td>
                  <td className={tdr}>{formData.deviceName}</td>
                </tr>
                <tr>
                  <td className={tdl}>Kategorie</td>
                  <td className={tdr}>{formData.category}</td>
                </tr>
                <tr>
                  <td className={tdl}>Raum</td>
                  <td className={tdr}>{formData.room}</td>
                </tr>
              </tbody>
            </table>
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
    <div className="fixed inset-0 px-5 h-full flex flex-col justify-between gap-8 no-scrollbar">
      {currentStep < 5 ? (
        <>
          <TopContextBar
            leftIcon={"ChevronLeft"}
            leftIconClick={currentStep > 1 ? handleBack : undefined}
            headline={"Gerät gefunden"}
            metaDescription={"Neues Gerät hinzufügen"}
            bg="bg-light"
          />
          <div className="flex flex-col items-center gap-8 h-full">
            <div
              className={twMerge(
                "p-4 rounded-lg grow-0 flex flex-col items-center gap-0 duration-300",
                currentStep === 1
                  ? "bg-inactive"
                  : hasMicrointeractions
                  ? categoryColor
                  : "bg-inactive",
                !formData.category && "bg-uwu"
              )}
            >
              <div className="w-full h-5 flex flex-row items-center gap-0">
                {hasMicrointeractions && currentStep > 1 && (
                  <div className="w-full text-center font-bold text-light">
                    {formData.deviceName}
                  </div>
                )}
              </div>
              <img src={Homepod} className="w-2/3"></img>
              <div className="w-full h-5 flex flex-row items-center justify-center gap-1 font-normal text-[11px] text-light">
                {hasMicrointeractions && currentStep > 2 && (
                  <div className="text-center">{formData.category}</div>
                )}
                {hasMicrointeractions && currentStep > 3 && (
                  <>
                    <div>•</div>
                    <div className="whitespace-nowrap text-center">
                      {formData.room}
                    </div>
                  </>
                )}
              </div>
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
                    variants={hasMicrointeractions ? variants : undefined}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={direction}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full flex flex-col items-center justify-center"
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="grow-0 mb-5">
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
              hasMicrointeractions ? categoryColor : "bg-inactive"
            )}
          >
            <div className="w-full h-5 flex flex-row items-center gap-0">
              {hasMicrointeractions && currentStep > 4 && (
                <div className="w-full text-center font-bold text-light">
                  {formData.deviceName}
                </div>
              )}
            </div>
            <img src={Homepod} className="w-2/3"></img>
            <div className="w-full h-5 flex flex-row items-center justify-center gap-1 font-normal text-[12px] text-light">
              {hasMicrointeractions && currentStep > 4 && (
                <div className="text-center">{formData.category}</div>
              )}
              {hasMicrointeractions && currentStep > 4 && (
                <>
                  <div>•</div>
                  <div className="whitespace-nowrap text-center">
                    {formData.room}
                  </div>
                </>
              )}
            </div>
          </div>
          {!hasMicrointeractions && (
            <div className="w-full flex flex-col gap-2 items-center">
              <div className="w-full text-center font-bold">
                {formData.deviceName}
              </div>

              <div className="w-full text-center font-bold">
                {formData.category}
              </div>

              <div className="w-full text-center font-bold">
                {formData.room}
              </div>
            </div>
          )}
          {renderStep()}
          <button className="btn-xl" onClick={() => navigate("/dashboard")}>
            Zum Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default DeviceRegistration;
