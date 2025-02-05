import { Link, useLocation } from "react-router-dom";

const topNavigation = () => {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `transition-colors text-nav font-alte-haas-bold ${
      location.pathname === path ? "text-dark" : "text-uwu"
    } `;

  const profileButtonClasses = `w-12 h-12 font-alte-haas-bold text-light text-[.75rem] rounded-full flex items-center justify-center transition-colors ${
    location.pathname === "/profile" ? "bg-dark" : "bg-uwu"
  }`;

  return (
    <nav className="absolute top-0 left-0 w-full pt-8 z-10 backdrop-blur-sm">
      <div className="px-800 flex justify-between items-center">
        <div className="flex gap-900">
          <Link to="/dashboard" className={linkClasses("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/devices" className={linkClasses("/devices")}>
            Geräte
          </Link>
        </div>

        <div className="flex items-center">
          <Link to="/profile" className={profileButtonClasses}>
            JG
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default topNavigation;
