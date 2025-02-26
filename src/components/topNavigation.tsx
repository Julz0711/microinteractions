import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export const TopNavigation = ({ isScrolled }: { isScrolled: boolean }) => {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `transition-colors text-nav font-bold ${
      location.pathname === path ? 'text-dark' : 'text-uwu'
    } `;

  const profileButtonClasses = `w-12 h-12 font-bold text-light text-[.75rem] rounded-full flex items-center justify-center transition-colors ${
    location.pathname === '/profil' ? 'bg-dark' : 'bg-uwu'
  }`;

  return (
    <nav
      className={twMerge(
        'fixed top-0 left-0 w-full pt-8 pb-4 z-50 backdrop-blur-sm bg-light duration-150',
        isScrolled ? 'shadow-lg' : 'shadow-none'
      )}
    >
      <div className="px-800 flex justify-between items-center">
        <div className="flex gap-900">
          <Link to="/dashboard" className={linkClasses('/dashboard')}>
            Dashboard
          </Link>
          <Link to="/geraete" className={linkClasses('/geraete')}>
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
