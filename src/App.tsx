import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import RegistrationStart from './components/screens/RegistrationStart';
import CreateAccount from './components/screens/CreateAccount';
import ProfileSetup from './components/screens/ProfileSetup';
import RegistrationSuccess from './components/screens/RegistrationSuccess';
import ThemeToggle from './components/ThemeToggle';

export type Screen = 'start' | 'create' | 'profile' | 'success';

interface FormData {
  email: string;
  password: string;
  fullName: string;
  profilePicture: string | null;
  interests: string[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    fullName: '',
    profilePicture: null,
    interests: [],
  });

  const handleNavigate = (screen: Screen) => {
    // Track analytics events
    if (screen === 'create') {
      console.log('Analytics: registration_start');
    } else if (screen === 'profile') {
      console.log('Analytics: register_submit');
    } else if (screen === 'success') {
      console.log('Analytics: profile_saved');
    }
    setCurrentScreen(screen);
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface-background transition-colors duration-300">
        <ThemeToggle />
        
        <div className="mx-auto max-w-[390px] min-h-screen relative overflow-hidden">
          {currentScreen === 'start' && (
            <RegistrationStart onNavigate={handleNavigate} />
          )}
          {currentScreen === 'create' && (
            <CreateAccount 
              onNavigate={handleNavigate}
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentScreen === 'profile' && (
            <ProfileSetup 
              onNavigate={handleNavigate}
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentScreen === 'success' && (
            <RegistrationSuccess onNavigate={handleNavigate} />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
