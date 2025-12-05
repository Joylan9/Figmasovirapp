# Motion Specifications

## Overview
This document defines all motion, timing, and animation specifications for the mobile registration flow. All animations are designed to enhance UX while maintaining performance (target: 60fps on all devices).

---

## Core Timing Values

### Duration Tokens
```css
--token-duration-instant: 100ms    /* Micro-interactions */
--token-duration-press: 160ms      /* Button press feedback */
--token-duration-header: 220ms     /* Header collapse */
--token-duration-transition: 320ms /* Page transitions */
--token-duration-confetti: 600ms   /* Success celebration */
```

### Easing Curves
```css
--token-easing-default: cubic-bezier(0.22, 0.9, 0.33, 1)     /* Snappy, bouncy */
--token-easing-smooth: cubic-bezier(0.16, 0.84, 0.28, 1)     /* Smooth, fluid */
--token-easing-ease-in-out: ease-in-out                       /* Standard */
```

---

## Component Animations

### 1. Button Press
**Trigger:** User taps/clicks button  
**Duration:** 160ms  
**Easing:** cubic-bezier(0.22, 0.9, 0.33, 1)  
**Properties:**
- `transform: scale(0.96)`
- Optional: subtle brightness increase

**CSS:**
```css
button {
  transition: transform 160ms cubic-bezier(0.22, 0.9, 0.33, 1);
}

button:active {
  transform: scale(0.96);
}
```

**Flutter:**
```dart
AnimatedScale(
  duration: Duration(milliseconds: 160),
  curve: Curves.easeOutCubic,
  scale: _isPressed ? 0.96 : 1.0,
  child: ElevatedButton(...),
)
```

---

### 2. Input Focus
**Trigger:** User focuses input field  
**Duration:** 200ms  
**Easing:** ease-in-out  
**Properties:**
- Border color: default → focus (primary_500)
- Border width: 1px → 2px
- Optional: subtle glow effect

**CSS:**
```css
input {
  border: 1px solid var(--token-color-border-default);
  transition: border-color 200ms ease-in-out,
              border-width 200ms ease-in-out;
}

input:focus {
  border: 2px solid var(--token-color-border-focus);
}
```

---

### 3. Password Strength Bar
**Trigger:** User types in password field  
**Duration:** 300ms  
**Easing:** ease-in-out  
**Properties:**
- Width: 0% → 25% → 50% → 75% → 100%
- Background color: error_500 → warning_500 → success_500

**CSS:**
```css
.strength-bar {
  height: 8px;
  border-radius: 9999px;
  background-color: var(--token-color-surface-elevated);
  overflow: hidden;
}

.strength-bar-fill {
  height: 100%;
  transition: width 300ms ease-in-out,
              background-color 300ms ease-in-out;
}
```

**States:**
- 0-2 criteria: width: 50%, color: error_500
- 3 criteria: width: 75%, color: warning_500
- 4 criteria: width: 100%, color: success_500

---

### 4. Checkbox Animation
**Trigger:** User checks/unchecks checkbox  
**Duration:** 300ms  
**Easing:** cubic-bezier(0.22, 0.9, 0.33, 1) (bounce)  
**Properties:**
- Background: transparent → gradient (primary_500 → primary_600)
- Checkmark: scale(0) → scale(1) with bounce
- Border: default → transparent

**CSS:**
```css
.checkbox {
  transition: background-color 300ms ease-in-out,
              border-color 300ms ease-in-out;
}

.checkbox.checked {
  background: linear-gradient(135deg, 
    var(--token-color-primary-500), 
    var(--token-color-primary-600));
  border-color: transparent;
}

.checkmark {
  animation: checkmark-bounce 300ms cubic-bezier(0.22, 0.9, 0.33, 1);
}

@keyframes checkmark-bounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
```

---

### 5. Chip Selection
**Trigger:** User taps interest chip  
**Duration:** 200ms  
**Easing:** cubic-bezier(0.22, 0.9, 0.33, 1)  
**Properties:**
- Background: chip_bg → chip_selected
- Border: 2px transparent → 2px primary_500
- Text color: chip_text → chip_selected_text
- Box shadow: none → 0 0 0 4px rgba(primary, 0.1)
- Scale: 1.0 → 0.95 → 1.02 → 1.0 (micro-bounce)

**CSS:**
```css
.chip {
  transition: all 200ms cubic-bezier(0.22, 0.9, 0.33, 1);
}

.chip:active {
  transform: scale(0.95);
}

.chip.selected {
  background: var(--token-color-chip-selected);
  border: 2px solid var(--token-color-primary-500);
  color: var(--token-color-chip-selected-text);
  box-shadow: 0 0 0 4px rgba(77, 156, 255, 0.1);
}
```

---

### 6. Page Transitions
**Trigger:** Navigation between screens  
**Duration:** 320ms  
**Easing:** cubic-bezier(0.16, 0.84, 0.28, 1)  
**Type:** Horizontal slide with parallax

**Properties:**
- Incoming screen: translateX(100%) → translateX(0)
- Outgoing screen: translateX(0) → translateX(-30%)
- Background: parallax at 20% speed (translateX(20%) → translateX(0))

**CSS:**
```css
.screen-enter {
  transform: translateX(100%);
  opacity: 0;
}

.screen-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: transform 320ms cubic-bezier(0.16, 0.84, 0.28, 1),
              opacity 320ms cubic-bezier(0.16, 0.84, 0.28, 1);
}

.screen-exit {
  transform: translateX(0);
  opacity: 1;
}

.screen-exit-active {
  transform: translateX(-30%);
  opacity: 0.5;
  transition: transform 320ms cubic-bezier(0.16, 0.84, 0.28, 1),
              opacity 320ms cubic-bezier(0.16, 0.84, 0.28, 1);
}
```

**Flutter PageRoute:**
```dart
PageRouteBuilder(
  transitionDuration: Duration(milliseconds: 320),
  pageBuilder: (context, animation, secondaryAnimation) => NextScreen(),
  transitionsBuilder: (context, animation, secondaryAnimation, child) {
    const begin = Offset(1.0, 0.0);
    const end = Offset.zero;
    const curve = Curves.easeOutCubic;
    
    var tween = Tween(begin: begin, end: end).chain(
      CurveTween(curve: curve),
    );
    
    return SlideTransition(
      position: animation.drive(tween),
      child: child,
    );
  },
);
```

---

### 7. Confetti Animation (Success Screen)
**Trigger:** Screen loads  
**Duration:** 600ms (per particle)  
**Easing:** cubic-bezier(0.22, 0.9, 0.33, 1)  
**Properties:**
- 20 particles
- Random horizontal positions (0-100%)
- Vertical movement: 0 → -100px
- Rotation: 0deg → 360deg
- Opacity: 1 → 0
- Stagger: 30ms delay between particles

**CSS:**
```css
@keyframes confetti {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.confetti-particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: confetti 600ms cubic-bezier(0.22, 0.9, 0.33, 1) forwards;
}

.confetti-particle:nth-child(1) { animation-delay: 0ms; }
.confetti-particle:nth-child(2) { animation-delay: 30ms; }
.confetti-particle:nth-child(3) { animation-delay: 60ms; }
/* ... up to 20 particles */
```

**Colors:**
- primary_500 (#4D9CFF)
- success_500 (#22C55E)
- warning_500 (#F59E0B)
- #FF6B9D (accent pink)
- #C084FC (accent purple)

---

### 8. Success Icon Animation
**Trigger:** Screen loads  
**Duration:** 500ms  
**Easing:** cubic-bezier(0.22, 0.9, 0.33, 1)  
**Properties:**
- Scale: 0.8 → 1.05 → 1.0 (bounce)
- Opacity: 0 → 1
- Ripple rings: 3 expanding circles

**CSS:**
```css
@keyframes success-icon-enter {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-icon {
  animation: success-icon-enter 500ms cubic-bezier(0.22, 0.9, 0.33, 1);
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.ripple-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--token-color-success-500);
  animation: ripple 1200ms ease-out infinite;
}

.ripple-ring:nth-child(2) { animation-delay: 400ms; }
.ripple-ring:nth-child(3) { animation-delay: 800ms; }
```

---

### 9. Theme Toggle
**Trigger:** User clicks theme toggle button  
**Duration:** 300ms  
**Easing:** ease-in-out  
**Properties:**
- Icon swap: Sun ↔ Moon with cross-fade
- All color tokens transition simultaneously
- Background transitions with 300ms delay

**CSS:**
```css
:root {
  transition: background-color 300ms ease-in-out 100ms;
}

[data-theme="dark"] {
  transition: background-color 300ms ease-in-out 100ms;
}

.theme-icon {
  animation: icon-swap 300ms ease-in-out;
}

@keyframes icon-swap {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: rotate(90deg) scale(0.5);
    opacity: 0;
  }
  100% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
}
```

---

### 10. Loading State
**Trigger:** Form submission  
**Duration:** Infinite (until complete)  
**Easing:** linear  
**Properties:**
- Spinner rotation: 360deg/1s
- Button text fades out (200ms)
- Spinner fades in (200ms)

**CSS:**
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

.button-content {
  transition: opacity 200ms ease-in-out;
}

.button-content.loading {
  opacity: 0;
}
```

---

### 11. Error Message Animation
**Trigger:** Validation error appears  
**Duration:** 300ms  
**Easing:** cubic-bezier(0.22, 0.9, 0.33, 1)  
**Properties:**
- Slide down: translateY(-8px) → translateY(0)
- Fade in: opacity 0 → 1
- Shake on critical error (optional)

**CSS:**
```css
@keyframes error-enter {
  0% {
    transform: translateY(-8px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.error-message {
  animation: error-enter 300ms cubic-bezier(0.22, 0.9, 0.33, 1);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.error-shake {
  animation: shake 300ms cubic-bezier(0.22, 0.9, 0.33, 1);
}
```

---

### 12. Profile Picture Upload
**Trigger:** User selects image  
**Duration:** 400ms  
**Easing:** ease-in-out  
**Properties:**
- Preview fade in: opacity 0 → 1
- Scale up: 0.9 → 1.0
- Placeholder fade out: opacity 1 → 0

**CSS:**
```css
.profile-picture-preview {
  animation: preview-enter 400ms ease-in-out;
}

@keyframes preview-enter {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

---

## Performance Considerations

### Hardware Acceleration
All animations use GPU-accelerated properties:
- ✅ `transform` (translate, scale, rotate)
- ✅ `opacity`
- ❌ Avoid: `width`, `height`, `top`, `left`, `margin`

### Reduced Motion Support
For users with `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Implementation:** Add to globals.css

---

## Testing Checklist

### Visual Testing
- [ ] All animations complete at 60fps
- [ ] No jank or stuttering on low-end devices
- [ ] Animations feel natural and responsive
- [ ] Timing feels consistent across all interactions

### Device Testing
- [ ] iPhone 13/14/15 (iOS 16+)
- [ ] Samsung Galaxy S21/S22/S23
- [ ] Pixel 6/7/8
- [ ] iPad (tablet breakpoint)

### Performance Testing
- [ ] Chrome DevTools Performance tab (no dropped frames)
- [ ] Battery impact minimal (< 5% increase during animations)
- [ ] Animations pause when app in background

---

## FlutterFlow Implementation

### Implicit Animations
Use Flutter's built-in animated widgets:
```dart
AnimatedContainer(
  duration: Duration(milliseconds: 200),
  curve: Curves.easeInOut,
  // properties
)

AnimatedOpacity(...)
AnimatedScale(...)
AnimatedPositioned(...)
```

### Explicit Animations
For complex animations:
```dart
AnimationController(
  duration: Duration(milliseconds: 320),
  vsync: this,
);

CurvedAnimation(
  parent: controller,
  curve: Curves.easeOutCubic,
);
```

### Custom Curves
```dart
// cubic-bezier(0.22, 0.9, 0.33, 1)
Cubic(0.22, 0.9, 0.33, 1.0)

// cubic-bezier(0.16, 0.84, 0.28, 1)
Cubic(0.16, 0.84, 0.28, 1.0)
```

---

## Lottie Animations

### Confetti Animation Specifications
**File:** `confetti.json`  
**Size:** < 500KB  
**Duration:** 600ms  
**Loop:** false  
**Fallback:** Static success icon + CSS confetti

### Implementation
```typescript
import Lottie from 'lottie-react';
import confettiAnimation from './animations/confetti.json';

<Lottie
  animationData={confettiAnimation}
  loop={false}
  autoplay={true}
  style={{ width: '100%', height: '100%' }}
/>
```

**Note:** Lottie file not included in this implementation. Use CSS confetti particles as demonstrated in RegistrationSuccess.tsx.

---

## Summary Table

| Animation | Duration | Easing | GPU | Reduces Motion Safe |
|-----------|----------|--------|-----|---------------------|
| Button Press | 160ms | default | ✅ | ✅ |
| Input Focus | 200ms | ease-in-out | ✅ | ✅ |
| Password Bar | 300ms | ease-in-out | ✅ | ✅ |
| Checkbox | 300ms | default | ✅ | ⚠️ (disable bounce) |
| Chip Select | 200ms | default | ✅ | ✅ |
| Page Transition | 320ms | smooth | ✅ | ⚠️ (reduce distance) |
| Confetti | 600ms | default | ✅ | ❌ (skip entirely) |
| Success Icon | 500ms | default | ✅ | ⚠️ (fade only) |
| Theme Toggle | 300ms | ease-in-out | ✅ | ✅ |
| Loading | 1000ms | linear | ✅ | ✅ |
| Error | 300ms | default | ✅ | ✅ |
| Image Upload | 400ms | ease-in-out | ✅ | ✅ |

---

**Document Version:** 1.0  
**Last Updated:** December 5, 2025  
**Maintained by:** Design System Team
