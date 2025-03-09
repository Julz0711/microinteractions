import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { setCategory, setHierarchy, setRoom } from "../store/reducer";
import { HierarchyStep } from "../types/dashboard.types";
import { Room } from "../types/types";

export const TopNavigation = ({ isScrolled }: { isScrolled: boolean }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const linkClasses = (path: string) =>
    `transition-colors text-nav hover:text-dark font-bold ${
      location.pathname === path ? "text-dark" : "text-uwu"
    } `;

  const profileButtonClasses = `w-12 h-12 hover:bg-dark font-bold text-light text-[.75rem] rounded-full flex items-center justify-center transition-colors ${
    location.pathname === "/profil" ? "bg-dark" : "bg-uwu"
  }`;

  const handleDashboardClick = () => {
    dispatch(setHierarchy(HierarchyStep.SmartHomeGrid));
    dispatch(setCategory(null));
    dispatch(setRoom(Room.LivingRoom));
  };

  return (
    <nav
      className={twMerge(
        "fixed top-0 left-0 w-full pt-4 sm:pt-8 pb-4 z-50 duration-50 bg-light",
        isScrolled ? "shadow-xl " : "shadow-none",
        location.pathname === "/" ? "pointer-events-none" : ""
      )}
    >
      <div className="px-800 flex justify-between items-center">
        <div className="flex gap-900">
          <Link
            to="/dashboard"
            className={linkClasses("/dashboard")}
            onClick={handleDashboardClick}
          >
            Dashboard
          </Link>
          <Link to="/geraete" className={linkClasses("/geraete")}>
            Geräte
          </Link>
        </div>

        <div className="flex items-center">
          <Link to="/profil" className={profileButtonClasses}>
            AS
          </Link>
        </div>
      </div>
    </nav>
  );
};
