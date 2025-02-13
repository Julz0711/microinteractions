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
            <div className="flex flex-col gap-2 items-center relative">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? "bg-red text-white border-red"
                    : isActive
                    ? "bg-red font-bold text-white border-red"
                    : "border-uwu text-uwu"
                }`}
              >
                {isCompleted ? (
                  <DynamicIcon iconName={"CheckAlt"} size="16" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-xs absolute top-12 ${
                  isActive || isCompleted ? "font-bold text-black" : "text-uwu"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Separator Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] w-8 mx-2 ${
                  isCompleted ? "bg-red" : "bg-uwu"
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
