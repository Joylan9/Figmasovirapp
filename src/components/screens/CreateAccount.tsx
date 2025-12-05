import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import { Screen } from '../../App';

interface CreateAccountProps {
  onNavigate: (screen: Screen) => void;
  formData: any;
  updateFormData: (data: any) => void;
}

interface ValidationState {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export default function CreateAccount({ onNavigate, formData, updateFormData }: CreateAccountProps) {
  const [email, setEmail] = useState(formData.email || '');
  const [password, setPassword] = useState(formData.password || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false, confirm: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password validation
  const validation: ValidationState = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const passwordStrength = Object.values(validation).filter(Boolean).length;
  const strengthLabel = passwordStrength === 0 ? '' : passwordStrength <= 2 ? 'Weak' : passwordStrength === 3 ? 'Medium' : 'Strong';
  const strengthColor = passwordStrength <= 2 ? 'var(--token-color-error-500)' : passwordStrength === 3 ? 'var(--token-color-warning-500)' : 'var(--token-color-success-500)';

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value) && value.length > 0) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password && value.length > 0) {
      setConfirmError('Passwords do not match.');
    } else {
      setConfirmError('');
    }
  };

  const isFormValid = () => {
    return (
      email.length > 0 &&
      !emailError &&
      Object.values(validation).every(v => v) &&
      password === confirmPassword &&
      agreeTerms
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setTouched({ email: true, password: true, confirm: true });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateFormData({ email, password });
    console.log('Analytics: register_submit');
    onNavigate('profile');
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 safe-top safe-bottom animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-primary mb-2">
          Create Your Account
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-5 flex-1">
          {/* Email Field */}
          <Input
            id="email"
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) validateEmail(e.target.value);
            }}
            onBlur={() => {
              setTouched(prev => ({ ...prev, email: true }));
              validateEmail(email);
            }}
            error={touched.email ? emailError : ''}
            maxLength={254}
            autoComplete="email"
            aria-label="Email address"
          />

          {/* Password Field */}
          <Input
            id="password"
            type="password"
            placeholder="Enter a secure password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
            showPasswordToggle
            maxLength={128}
            autoComplete="new-password"
            aria-label="Password"
          />

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-secondary text-body-sm">
                    Password Strength
                  </span>
                  <span className="text-body-sm" style={{ color: strengthColor, fontWeight: 600 }}>
                    {strengthLabel}
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${(passwordStrength / 4) * 100}%`,
                      backgroundColor: strengthColor,
                    }}
                  />
                </div>
              </div>

              {/* Password Requirements Checklist */}
              <div className="space-y-2 p-4 bg-surface-card rounded-xl border border-default">
                <Checkbox
                  checked={validation.minLength}
                  label="At least 8 characters"
                  animated
                />
                <Checkbox
                  checked={validation.hasUppercase}
                  label="1 uppercase letter"
                  animated
                />
                <Checkbox
                  checked={validation.hasNumber}
                  label="1 number"
                  animated
                />
                <Checkbox
                  checked={validation.hasSpecial}
                  label="1 special character (!@#$…)"
                  animated
                />
              </div>
            </div>
          )}

          {/* Confirm Password Field */}
          <Input
            id="confirm-password"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (touched.confirm) validateConfirmPassword(e.target.value);
            }}
            onBlur={() => {
              setTouched(prev => ({ ...prev, confirm: true }));
              validateConfirmPassword(confirmPassword);
            }}
            error={touched.confirm ? confirmError : ''}
            showPasswordToggle
            maxLength={128}
            autoComplete="new-password"
            aria-label="Confirm password"
          />

          {/* Terms & Privacy Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div
                className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 mt-0.5 ${
                  agreeTerms
                    ? 'bg-gradient-to-r from-[var(--token-color-primary-500)] to-[var(--token-color-primary-600)] border-transparent'
                    : 'border-default bg-surface-card group-hover:border-strong'
                }`}
                style={{
                  minWidth: '20px',
                  minHeight: '20px',
                }}
              >
                {agreeTerms && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="sr-only"
                aria-checked={agreeTerms}
              />
              <span className="text-secondary text-body-sm">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Terms of Service placeholder');
                  }}
                  className="text-[var(--token-color-primary-500)] hover:underline"
                >
                  Terms of Service
                </button>
                {' '}and{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Privacy Policy placeholder');
                  }}
                  className="text-[var(--token-color-primary-500)] hover:underline"
                >
                  Privacy Policy
                </button>
              </span>
            </label>
          </div>
        </div>

        {/* Create Account Button */}
        <div className="pt-6 space-y-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!isFormValid()}
            loading={isSubmitting}
            aria-label="Create account"
          >
            Create Account
          </Button>

          {/* Footer Link */}
          <div className="text-center">
            <p className="text-secondary text-body-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => alert('Log in placeholder')}
                className="text-[var(--token-color-primary-500)] hover:text-[var(--token-color-primary-700)] transition-colors underline"
                aria-label="Log in to existing account"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
