import { Routes, Route } from "react-router-dom";
import { ReactNode, Suspense, lazy } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      transition={{ duration: 0.5 }}
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

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>{allRoutes.map((route) => routeMap(route))}</Routes>
    </Suspense>
  );
};

export default AppRouter;
