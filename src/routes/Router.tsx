import { Routes, Route } from "react-router-dom";
import { ReactNode, Suspense, lazy } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import { twMerge } from "tailwind-merge";
import { Overlay } from "../components/Overlay";

const Start = lazy(() => import("../pages/Start"));
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
    path: "/start",
    component: <Start />,
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
  scrollableRef,
}: {
  children: ReactNode;
  showNewButton: boolean;
  scrollableRef: React.RefObject<HTMLDivElement>;
}) {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  return (
    <motion.div
      key={location.pathname}
      initial={
        hasMicrointeractions ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }
      }
      animate={
        hasMicrointeractions ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
      }
      exit={
        hasMicrointeractions ? { opacity: 0, y: 0 } : { opacity: 1, y: -50 }
      }
      transition={hasMicrointeractions ? { duration: 0.25 } : { duration: 0 }}
      className="w-full h-full"
    >
      <div
        ref={scrollableRef}
        className="h-full w-full overflow-x-hidden overflow-y-auto no-scrollbar"
      >
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
  showNewButton,
  scrollableRef,
}: {
  showNewButton: boolean;
  scrollableRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div className="overflow-hidden w-full h-full">
      <Suspense fallback={<Overlay isMenuOpen={true} />}>
        <AnimatePresence mode="wait">
          <Routes>
            {allRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PageWrapper
                    showNewButton={showNewButton}
                    scrollableRef={scrollableRef}
                  >
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
