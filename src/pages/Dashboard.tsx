import React from "react";
import ScrollableNavBar from "../components/scrollableNavBar";

const Dashboard = () => {
  return (
    <div>
      <div className="scrollable-nav-bar overflow-x-auto w-full">
        <ScrollableNavBar />
      </div>
    </div>
  );
};

export default Dashboard;
