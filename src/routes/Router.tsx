import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "../components/loadingSpinner";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Devices = lazy(() => import("../pages/Devices"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const NewDevice = lazy(() => import("../pages/NewDevice"));
const NewRoom = lazy(() => import("../pages/NewRoom"));

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Dashboard hasDevices={false} />} />
        <Route path="/dashboard" element={<Dashboard hasDevices={true} />} />
        <Route path="/geraete" element={<Devices />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrieren" element={<Register />} />
        <Route path="/neues-geraet" element={<NewDevice />} />
        <Route path="/neuer-raum" element={<NewRoom />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
