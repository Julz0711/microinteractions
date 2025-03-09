import React from "react";
import DynamicIcon from "./DynamicIcon";

interface StepProgressProps {
  currentStep: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  const steps = ["Name", "Kategorie", "Raum", "Übersicht"];

  return (
    <div className="flex items-center justify-center w-full">
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;

        return (
          <div key={index} className="flex items-center">
            {/* Circle Step */}
            <div className="flex flex-col gap-2 items-center relative mb-4">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm ${
                  isCompleted
                    ? "bg-inactive text-uwu border-inactive"
                    : isActive
                    ? "bg-red font-bold text-white border-red"
                    : "border-uwu text-uwu font-normal"
                }`}
              >
                {isCompleted ? (
                  <DynamicIcon iconName={"CheckAlt"} size="16" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-xs absolute top-10 ${
                  isActive
                    ? "font-bold text-black"
                    : isCompleted
                    ? "font-bold text-uwu"
                    : "font-normal text-uwu"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Separator Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] w-8 mx-2 -translate-y-2 ${
                  isCompleted ? "bg-uwu" : "bg-uwu"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
