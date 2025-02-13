import React, { useEffect, useState } from "react";
import { TopContextBar } from "../components/TopContextBar";
import InputField from "../components/InputField";
import Homepod from "../assets/img/homepod.png";
import { twMerge } from "tailwind-merge";
import DynamicIcon from "../components/DynamicIcon";
import { AppState } from "../store/store";
import { useSelector } from "react-redux";
import Scrolldown from "../components/Scrolldown";
import {
  getColor,
  getAllCategoryNames,
  getAllRoomNames,
} from "../helpers/helpers";
import StepProgress from "../components/StepProgress";
import { Category } from "../types/dashboard.types";

const IntroText = ({ header, desc }: { header: string; desc: string }) => {
  return (
    <div className="text-center w-4/5">
      <h1>{header}</h1>
      <p>{desc}</p>
    </div>
  );
};

const DeviceRegistration = () => {
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

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
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
    console.log("Selected category:", item); // Logs the category being selected
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
            <div className="w-3/4">
              <Scrolldown
                color={categoryColor}
                items={getAllCategoryNames()}
                onSelect={(item: string) => handleSelect("category", item)}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full flex flex-col gap-4 items-center">
            <IntroText
              header={"Raumauswahl"}
              desc={"In welchem Raum befindet sich dein Gerät?"}
            />
            <div className="w-3/4">
              <Scrolldown
                color={"bg-dark"}
                items={getAllRoomNames()}
                onSelect={(item: string) => handleSelect("room", item)}
              />
            </div>
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
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col justify-between gap-8 pb-5 overflow-y-scroll no-scrollbar">
      <TopContextBar
        leftIcon={"Bluetooth"}
        leftIconClick={currentStep > 1 ? handleBack : undefined}
        headline={"Gerät gefunden"}
        metaDescription={"Neues Gerät hinzufügen"}
      />
      <div className="flex flex-col items-center gap-8 h-full">
        <div
          className={twMerge(
            "p-4 rounded-lg grow-0 flex flex-col items-center gap-0",
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
        <div className="w-full">
          <StepProgress currentStep={currentStep} />
        </div>
        <div className="w-full flex flex-col justify-between grow gap-8">
          <div className="grow flex items-center justify-center">
            {renderStep()}
          </div>
          <div className="grow-0">
            {currentStep < 4 ? (
              <button
                className="btn-full"
                onClick={handleNext}
                disabled={formData.deviceName.trim() === ""}
              >
                Weiter
              </button>
            ) : (
              <button
                className="bg-green btn-full"
                onClick={() => alert("Gerät hinzugefügt!")}
              >
                Gerät hinzufügen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistration;

{
  /*
  Microinteractions
  Submit
  Celebretory Gif
  Back to Dashboard
  "*/
}
