import { TopContextBar } from '../components/TopContextBar';
import GlowBoyz from '../components/GlowBoyz';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import Button from '../components/Button';
import PasswordStrengthBar from '../components/PasswordStrengthBar';
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const navigate = useNavigate();
  const [showErrors, setshowErrors] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, 'Benutzername muss mindestens 4 Zeichen lang sein.')
      .required('Username ist erforderlich'),
    email: Yup.string()
      .email('Geben Sie eine gültige E-Mail-Adresse ein.')
      .required('E-Mail ist erforderlich'),
    password: Yup.string()
      .min(6, 'Passwort muss mindestens 6 Zeichen lang sein.')
      .required('Passwort ist erforderlich'),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), undefined],
        'Passwörter stimmen nicht überein.'
      )
      .required('Passwort bestätigen ist erforderlich')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      navigate('/');
    },
    validateOnMount: false
  });

  const handleClick = () => {
      setshowErrors(true);
  }

  return (
    <div className="fixed inset-0 px-5 h-full flex flex-col justify-between gap-4 overflow-y-auto">
      <TopContextBar
        headline={'Registrierung'}
        metaDescription={'Account erstellen'}
        rightIcon={'Close'}
        rightIconBg={true}
        rightIconBgColour={'bg-dark'}
        rightIconLink="/login"
        bg="bg-light"
      />
      <div className="flex flex-col gap-2 pb-5 grow">
        <div className="mx-auto w-2/3 grow">
          <GlowBoyz />
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
              type={'text'}
              name={'username'}
              placeholder={'Benutzername'}
              value={formik.values.username}
              change={formik.handleChange}
              blur={formik.handleBlur}
              icon={'User'}
              isValid={formik.touched.username && !formik.errors.username}
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : ''
              }
            />
            <InputField
              type={'email'}
              name={'email'}
              placeholder={'E-Mail Addresse'}
              value={formik.values.email}
              change={formik.handleChange}
              blur={formik.handleBlur}
              icon={'Envelope'}
              isValid={formik.touched.email && !formik.errors.email}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ''
              }
            />
            <div>
              <InputField
                type={'password'}
                name={'password'}
                placeholder={'Passwort'}
                value={formik.values.password}
                change={formik.handleChange}
                blur={formik.handleBlur}
                icon={'Lock'}
                isValid={formik.touched.password && !formik.errors.password}
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ''
                }
              />
              {hasMicrointeractions && (
                <PasswordStrengthBar password={formik.values.password} />
              )}
            </div>
            <InputField
              type={'password'}
              name={'confirmPassword'}
              placeholder={'Passwort bestätigen'}
              value={formik.values.confirmPassword}
              change={formik.handleChange}
              blur={formik.handleBlur}
              icon={'Lock'}
              isValid={
                formik.touched.confirmPassword && !formik.errors.confirmPassword
              }
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : ''
              }
            />
            {!hasMicrointeractions && Object.keys(formik.errors).length > 0 && showErrors && (
              <ul>
                {Object.values(formik.errors).map((error, index) => (
                  <li key={index} className="text-red px-2">
                    {error}
                  </li>
                ))}
              </ul>
            )}
            {hasMicrointeractions ? (
              <Button
                label={' Account erstellen'}
                style={'btn-primary'}
                disabled={!formik.isValid}
              ></Button>
            ) : (
              <button type="submit" onClick={handleClick}className="btn-full bg-red">
                Account erstellen
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
