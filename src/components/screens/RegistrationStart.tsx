import React from 'react';
import { Mail } from 'lucide-react';
import Button from '../ui/Button';
import { Screen } from '../../App';

interface RegistrationStartProps {
  onNavigate: (screen: Screen) => void;
}

export default function RegistrationStart({ onNavigate }: RegistrationStartProps) {
  return (
    <div 
      className="min-h-screen flex flex-col justify-between px-6 py-8 safe-top safe-bottom animate-[fadeIn_0.4s_ease-out]"
    >
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-primary mb-4">
            Get Started
          </h1>
          <p className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px' }}>
            Unlock access to our full library of automation courses.
          </p>
        </div>

        <div className="space-y-4">
          {/* Primary CTA - Register with Email */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            icon={<Mail className="w-5 h-5" />}
            onClick={() => onNavigate('create')}
            aria-label="Register with Email"
          >
            Register with Email
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[var(--token-color-border-default)]" />
            <span className="text-tertiary" style={{ fontSize: '14px', lineHeight: '20px' }}>
              or
            </span>
            <div className="flex-1 h-px bg-[var(--token-color-border-default)]" />
          </div>

          {/* Social Login Buttons */}
          <Button
            variant="outline"
            size="lg"
            fullWidth
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            }
            onClick={() => alert('Google sign-in placeholder')}
            aria-label="Continue with Google"
          >
            Continue with Google
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            }
            onClick={() => alert('Apple sign-in placeholder')}
            aria-label="Continue with Apple"
          >
            Continue with Apple
          </Button>
        </div>
      </div>

      {/* Footer Link */}
      <div className="text-center mt-8">
        <p className="text-secondary" style={{ fontSize: '14px', lineHeight: '20px' }}>
          Already have an account?{' '}
          <button 
            onClick={() => alert('Sign in placeholder')}
            className="text-[var(--token-color-primary-500)] hover:text-[var(--token-color-primary-700)] transition-colors underline min-h-[44px] px-2"
            aria-label="Sign in to existing account"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
