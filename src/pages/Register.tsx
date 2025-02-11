import React from "react";
import { TopContextBar } from "../components/TopContextBar";
import GlowBoys from "../assets/img/glow_boys_coloured.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import DynamicIcon from "../components/DynamicIcon";

const InputField = ({
  type,
  name,
  placeholder,
  value,
  change,
  blur,
  icon,
  error,
}: {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  blur: (e: React.FocusEvent<HTMLInputElement>) => void;
  icon: string;
  error?: string;
}) => {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={change}
          onBlur={blur}
          required
          className={`w-full pl-12 pr-4 py-3 bg-inactive rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple`}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <DynamicIcon iconName={icon} size="20" color="text-dark" />
        </div>
      </div>
      {error && <p className="mt-1 pl-2 text-sm text-red">{error}</p>}
    </div>
  );
};

const Register = () => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username muss mindestens 4 Zeichen lang sein.")
      .required("Username ist erforderlich"),
    email: Yup.string()
      .email("Geben Sie eine gültige E-Mail-Adresse ein.")
      .required("E-Mail ist erforderlich"),
    password: Yup.string()
      .min(6, "Passwort muss mindestens 6 Zeichen lang sein.")
      .required("Passwort ist erforderlich"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), undefined],
        "Passwörter stimmen nicht überein."
      )
      .required("Passwort bestätigen ist erforderlich"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Registration successful", values);
    },
  });

  return (
    <div className="h-full flex flex-col justify-around gap-4">
      <TopContextBar
        headline={"Registrierung"}
        metaDescription={"Account erstellen"}
        rightIcon={"Bluetooth"}
        rightIconBg={true}
      />
      <div className="w-4/5 mx-auto grow">
        <img src={GlowBoys} alt="Registrierung Header" className="w-full" />
      </div>

      <div className="grow-0 flex flex-col gap-4 justify-center items-center px-4">
        <div className="w-3/4 mx-auto">
          <div className="text-xl text-center font-alte-haas-bold">
            Bereit für Dein smartes Zuhause?
          </div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-full mt-4"
        >
          <InputField
            type={"text"}
            name={"username"}
            placeholder={"Benutzername"}
            value={formik.values.username}
            change={formik.handleChange}
            blur={formik.handleBlur}
            icon={"Bluetooth"}
            error={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : ""
            }
          />
          <InputField
            type={"email"}
            name={"email"}
            placeholder={"E-Mail Addresse"}
            value={formik.values.email}
            change={formik.handleChange}
            blur={formik.handleBlur}
            icon={"Bluetooth"}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
          <InputField
            type={"password"}
            name={"password"}
            placeholder={"Passwort"}
            value={formik.values.password}
            change={formik.handleChange}
            blur={formik.handleBlur}
            icon={"Bluetooth"}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
          />
          <InputField
            type={"password"}
            name={"confirmPassword"}
            placeholder={"Passwort bestätigen"}
            value={formik.values.confirmPassword}
            change={formik.handleChange}
            blur={formik.handleBlur}
            icon={"Bluetooth"}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ""
            }
          />
          <button
            type="submit"
            className="px-4 py-4 text-xl font-alte-haas-bold bg-red text-white rounded-md cursor-pointer duration-150 hover:bg-purple"
            disabled={!formik.isValid}
          >
            Account erstellen
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
