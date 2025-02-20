import { Routes, Route, useLocation } from "react-router-dom";
import { ReactNode, Suspense, lazy, useEffect, useRef } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { twMerge } from "tailwind-merge";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Devices = lazy(() => import("../pages/Devices"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const NewDevice = lazy(() => import("../pages/NewDevice"));
const NewSchedule = lazy(() => import("../pages/NewSchedule"));
const DeviceRegistration = lazy(() => import("../pages/DeviceRegistration"));
const NewRoom = lazy(() => import("../pages/NewRoom"));

const allRoutes = [
  {
    path: "/",
    component: <Dashboard hasDevices={false} />,
  },
  {
    path: "/dashboard",
    component: <Dashboard hasDevices={true} />,
  },
  {
    path: "/geraete",
    component: <Devices />,
  },
  {
    path: "/profil",
    component: <Profile />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/registrieren",
    component: <Register />,
  },
  {
    path: "/neues-geraet",
    component: <NewDevice />,
  },
  {
    path: "/neuer-raum",
    component: <NewRoom />,
  },
  {
    path: "/neuer-zeitplan",
    component: <NewSchedule />,
  },
  {
    path: "/geraet-registrieren",
    component: <DeviceRegistration />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];

function PageWrapper({
  children,
  showNewButton,
}: {
  children: ReactNode;
  showNewButton: boolean;
}) {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  useEffect(() => {
    console.log("PageWrapper received showNewButton:", showNewButton);
  }, [showNewButton]);

  return (
    <motion.div
      key={location.pathname}
      initial={
        hasMicrointeractions
          ? { opacity: 0, scale: 0.75 }
          : { opacity: 1, scale: 1 }
      }
      animate={
        hasMicrointeractions
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1 }
      }
      exit={
        hasMicrointeractions
          ? { opacity: 0, scale: 0.75 }
          : { opacity: 1, scale: 1 }
      }
      transition={hasMicrointeractions ? { duration: 0.5 } : { duration: 0 }}
      className="w-full h-full"
    >
      <div className="h-full w-full overflow-x-hidden overflow-y-auto no-scrollbar">
        <div
          className={twMerge(
            "min-h-full px-5",
            showNewButton ? "pb-36" : "pb-5 h-full"
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

const AppRouter = ({
  onScroll,
  showNewButton,
}: {
  onScroll: (scrollY: number) => void;
  showNewButton: boolean;
}) => {
  const location = useLocation();
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableRef.current) {
        onScroll(scrollableRef.current.scrollTop);
      }
    };

    const scrollableElement = scrollableRef.current;
    scrollableElement?.addEventListener("scroll", handleScroll);
    return () => {
      scrollableElement?.removeEventListener("scroll", handleScroll);
    };
  }, [onScroll]);

  return (
    <div ref={scrollableRef} className="overflow-hidden w-full h-full">
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes>
            {allRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PageWrapper showNewButton={showNewButton}>
                    {route.component}
                  </PageWrapper>
                }
              />
            ))}
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default AppRouter;
