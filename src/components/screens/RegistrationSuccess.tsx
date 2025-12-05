import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import { Screen } from '../../App';

interface RegistrationSuccessProps {
  onNavigate: (screen: Screen) => void;
}

export default function RegistrationSuccess({ onNavigate }: RegistrationSuccessProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 safe-top safe-bottom animate-[fadeIn_0.4s_ease-out] relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-[confetti_0.6s_ease-out_forwards]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 0.3}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: [
                    'var(--token-color-primary-500)',
                    'var(--token-color-success-500)',
                    'var(--token-color-warning-500)',
                    '#FF6B9D',
                    '#C084FC',
                  ][i % 5],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="max-w-md w-full text-center space-y-8 animate-[scaleIn_0.5s_ease-out]">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div 
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[var(--token-color-success-500)] to-[var(--token-color-success-500)] flex items-center justify-center animate-[bounce_0.6s_ease-in-out]"
            style={{
              boxShadow: '0 0 0 12px rgba(34, 197, 94, 0.1), 0 0 0 24px rgba(34, 197, 94, 0.05)',
            }}
          >
            <CheckCircle2 className="w-20 h-20 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-primary mb-4">
            Registration Successful!
          </h1>
          <p className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px' }}>
            Your account has been created. You are now ready to start your journey into the world of automation.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => alert('Navigate to courses (placeholder)')}
            aria-label="Explore courses"
          >
            Explore Courses
          </Button>
        </div>
      </div>
    </div>
  );
}
