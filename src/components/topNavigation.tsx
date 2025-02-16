import { Link, useLocation } from "react-router-dom";

export const TopNavigation = () => {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `transition-colors text-nav font-bold ${
      location.pathname === path ? "text-dark" : "text-uwu"
    } `;

  const profileButtonClasses = `w-12 h-12 font-bold text-light text-[.75rem] rounded-full flex items-center justify-center transition-colors ${
    location.pathname === "/profile" ? "bg-dark" : "bg-uwu"
  }`;

  return (
    <nav className="sticky top-0 left-0 w-full pt-8 z-90 backdrop-blur-md pb-4 bg-linear-to-b from-light to-transparent">
      <div className="px-800 flex justify-between items-center">
        <div className="flex gap-900">
          <Link to="/dashboard" className={linkClasses("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/geraete" className={linkClasses("/geraete")}>
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
