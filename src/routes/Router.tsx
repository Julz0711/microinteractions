import { Routes, Route, useLocation } from "react-router-dom";
import { ReactNode, Suspense, lazy, useEffect, useRef } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";

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
    path: "/register",
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

function PageWrapper({ children }: { children: ReactNode }) {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
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
      {children}
    </motion.div>
  );
}

function routeMap({
  path,
  component,
}: {
  path: string;
  component: any;
  hasDevices?: boolean;
}) {
  return (
    <Route
      path={path}
      element={<PageWrapper children={component}></PageWrapper>}
    />
  );
}

const AppRouter = ({ onScroll }: { onScroll: (scrollY: number) => void }) => {
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
    <div
      ref={scrollableRef}
      className="px-5 w-full h-full no-scrollbar overflow-y-scroll"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes>{allRoutes.map((route) => routeMap(route))}</Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default AppRouter;
