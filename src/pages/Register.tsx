import { TopContextBar } from "../components/TopContextBar";
import GlowBoys from "../components/GlowBoyz";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../components/InputField";
import Button from "../components/Button";

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
    <div className="h-full flex flex-col justify-between gap-4">
      <TopContextBar
        headline={"Registrierung"}
        metaDescription={"Account erstellen"}
        rightIcon={"Close"}
        rightIconBg={true}
        rightIconLink="/dashboard"
      />
      <div className="mx-auto w-5/8 grow">
        <GlowBoys />
      </div>

      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="w-3/4 mx-auto">
          <div className="text-xl text-center font-bold">
            Bereit für Dein smartes Zuhause?
          </div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-full mt-4 z-90"
        >
          <InputField
            type={"text"}
            name={"username"}
            placeholder={"Benutzername"}
            value={formik.values.username}
            change={formik.handleChange}
            blur={formik.handleBlur}
            icon={"At"}
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
            icon={"Envelope"}
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
            icon={"Lock"}
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
            icon={"Lock"}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ""
            }
          />
          <Button
            label={" Account erstellen"}
            style={"btn-primary"}
            link={"/registrieren"}
            disabled={!formik.isValid}
          ></Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
