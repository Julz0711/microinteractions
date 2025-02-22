import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHierarchy, setCategory } from "../../../store/reducer";
import { AppState } from "../../../store/store";
import { Category, HierarchyStep } from "../../../types/dashboard.types";
import { TopContextBar } from "../../TopContextBar";
import { useState } from "react";
import { LightsComponent } from "../../DeviceSettings/LightsComponent";
import { AirComponent } from "../../DeviceSettings/AirComponent";
import { EntertainmentComponent } from "../../DeviceSettings/EntertainmentComponent";
import { HeatComponent } from "../../DeviceSettings/HeatComponent";
import { HouseholdComponent } from "../../DeviceSettings/HouseholdComponent";

export function DeviceOverlay() {
  const dispatch = useDispatch();

  const hierarchy = useSelector((state: AppState) => state.app.hierarchy);
  const category = useSelector((state: AppState) => state.app.category);
  const device = useSelector((state: AppState) => state.app.device);

  const handleCloseDevice = () => {
    dispatch(setHierarchy(HierarchyStep.CategoryGrid));
    setCategory(null);
  };

  const renderCategoryComponent = () => {
    switch (category) {
      case Category.Lights:
        return <LightsComponent />;
      case Category.Heat:
        return <HeatComponent />;
      case Category.Entertainment:
        return <EntertainmentComponent />;
      case Category.Air:
        return <AirComponent />;
      case Category.Household:
        return <HouseholdComponent />;
      default:
        return null;
    }
  };

  return (
    <>
      {hierarchy === HierarchyStep.Device && device && (
        <div className="fixed w-full h-full top-0 left-0 z-100 px-4 gap-8 flex flex-col">
          <TopContextBar
            headline={device.name}
            metaDescription={device.model}
            metaDescriptionDark={true}
            rightIcon="Options"
            rightIconBg={true}
            leftIcon="ChevronLeft"
            leftIconClick={() => handleCloseDevice()}
          />
          {renderCategoryComponent()}
        </div>
      )}
    </>
  );
}
