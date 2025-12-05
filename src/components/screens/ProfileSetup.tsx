import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Chip from '../ui/Chip';
import { Screen } from '../../App';

interface ProfileSetupProps {
  onNavigate: (screen: Screen) => void;
  formData: any;
  updateFormData: (data: any) => void;
}

const INTERESTS = [
  'PLC Programming',
  'SCADA Systems',
  'HMI Design',
  'Industrial Networks',
  'Robotics',
];

export default function ProfileSetup({ onNavigate, formData, updateFormData }: ProfileSetupProps) {
  const [fullName, setFullName] = useState(formData.fullName || '');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(formData.interests || []);
  const [profilePicture, setProfilePicture] = useState<string | null>(formData.profilePicture || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        console.log('Analytics: profile_picture_uploaded');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateFormData({
      fullName,
      interests: selectedInterests,
      profilePicture,
    });
    
    console.log('Analytics: profile_saved');
    console.log('Analytics: register_success');
    onNavigate('success');
  };

  const handleSkip = () => {
    console.log('Analytics: profile_skipped');
    onNavigate('success');
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 safe-top safe-bottom animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-primary mb-2">
          Create Your Profile
        </h2>
        <p className="text-secondary" style={{ fontSize: '16px', lineHeight: '24px' }}>
          This will help us personalize your learning experience.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-6 flex-1">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              onChange={handleImageUpload}
              className="sr-only"
              aria-label="Upload profile picture"
            />
            <label
              htmlFor="profile-picture"
              className="relative w-32 h-32 rounded-full bg-surface-elevated border-2 border-dashed border-default hover:border-strong cursor-pointer transition-all duration-200 flex items-center justify-center group overflow-hidden"
              style={{
                boxShadow: 'var(--token-elevation-level2)',
              }}
            >
              {profilePicture ? (
                <>
                  <img
                    src={profilePicture}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--token-color-primary-500)] to-[var(--token-color-primary-600)] flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
            </label>
            <p className="text-tertiary text-body-sm mt-3">
              Upload Profile Picture (Optional)
            </p>
          </div>

          {/* Full Name Field */}
          <Input
            id="full-name"
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            maxLength={50}
            autoComplete="name"
            required
            aria-label="Full name"
          />

          {/* Email Field (pre-filled, disabled) */}
          <Input
            id="email-display"
            type="email"
            label="Email Address"
            value={formData.email}
            disabled
            aria-label="Email address (pre-filled)"
          />

          {/* Learning Interests */}
          <div>
            <label className="block mb-3 text-primary" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
              Learning Interests (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <Chip
                  key={interest}
                  label={interest}
                  selected={selectedInterests.includes(interest)}
                  onClick={() => toggleInterest(interest)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 space-y-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!fullName.trim()}
            loading={isSubmitting}
            aria-label="Save profile and continue"
          >
            Save and Continue
          </Button>

          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-center py-3 text-tertiary hover:text-secondary transition-colors text-body-sm min-h-[44px]"
            aria-label="Skip profile setup"
          >
            Skip for now
          </button>
        </div>
      </form>
    </div>
  );
}
