import React, { useState } from 'react';
import { TopContextBar } from '../components/TopContextBar';
import InputField from '../components/InputField';
import Homepod from '../assets/img/homepod.png';
import { twMerge } from 'tailwind-merge';
import DynamicIcon from '../components/DynamicIcon';
import { AppState } from '../store/store';
import { useSelector } from 'react-redux';
import Scrolldown from '../components/Scrolldown';

const IntroText = ({ header, desc }: { header: string; desc: string }) => {
  return (
    <div className="text-center w-4/5">
      <h1>{header}</h1>
      <p>{desc}</p>
    </div>
  );
};

const DeviceRegistration = () => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    deviceName: '',
    category: '',
    room: ''
  });
  const [error, setError] = useState('');

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() === '') {
      setError('Device name cannot be empty');
    } else {
      setError('');
    }
  };

  const clearInput = (field: string) => {
    setFormData((prev) => ({ ...prev, [field]: '' }));
    setError('Device name cannot be empty');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-8 items-center">
            <IntroText
              header={'Gerätename'}
              desc={
                'Benutze den vorgegebenen Namen oder erstelle einen eigenen'
              }
            />
            <div className="relative w-3/4">
              <InputField
                type="text"
                name="deviceName"
                placeholder="Gerätename"
                value={formData.deviceName}
                change={handleChange}
                blur={() => {}}
                hasIcon={false}
                error={error}
              />
              {hasMicrointeractions
                ? formData.deviceName && (
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-uwu cursor-pointer"
                      onClick={() => clearInput('deviceName')}
                    >
                      <DynamicIcon iconName="Close" size="24" />
                    </button>
                  )
                : null}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full flex flex-col gap-8 items-center">
            <IntroText
              header={'Gerätename'}
              desc={
                'Benutze den vorgegebenen Namen oder erstelle einen eigenen'
              }
            />
            <div className="w-3/4">
              <Scrolldown
                items={[
                  'Wohnzimmer',
                  'Küche',
                  'Sclafzimmer',
                  'Büro',
                  'Badezimmer'
                ]}
                onSelect={function (item: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <label htmlFor="room">Raum</label>
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Raum wählen</option>
              <option value="Wohnzimmer">Wohnzimmer</option>
              <option value="Schlafzimmer">Schlafzimmer</option>
              <option value="Küche">Küche</option>
            </select>
          </div>
        );
      case 4:
        return (
          <div>
            <h3>Übersicht</h3>
            <p>Gerätename: {formData.deviceName}</p>
            <p>Kategorie: {formData.category}</p>
            <p>Raum: {formData.room}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col justify-between gap-8 pb-5">
      <TopContextBar
        leftIcon={'Bluetooth'}
        leftIconClick={currentStep > 1 ? handleBack : undefined}
        headline={'Gerät gefunden'}
        metaDescription={'Neues Gerät hinzufügen'}
      />
      <div className="flex flex-col items-center gap-8 h-full">
        <div
          className={twMerge(
            'p-4 rounded-lg grow-0',
            currentStep === 1 ? 'bg-inactive' : 'bg-purple shadow-md'
          )}
        >
          <img src={Homepod}></img>
        </div>
        <div className="grow-0 w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
        <div className="w-full flex flex-col justify-between grow gap-8">
          <div className="grow flex items-center justify-center">
            {renderStep()}
          </div>
          <div className="grow-0">
            {currentStep < 4 ? (
              <button
                className="btn-full"
                onClick={handleNext}
                disabled={formData.deviceName.trim() === ''}
              >
                Weiter
              </button>
            ) : (
              <button
                className="bg-green btn-full"
                onClick={() => alert('Gerät hinzugefügt!')}
              >
                Gerät hinzufügen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistration;
