# Andishi Design System Documentation

## Table of Contents

1. [Typography](#typography)
2. [Colors](#colors)
3. [Spacing & Layout](#spacing--layout)
4. [Glassmorphism Effects](#glassmorphism-effects)
5. [Animations & Transitions](#animations--transitions)
6. [Components](#components)
7. [Responsive Design](#responsive-design)

## Typography

### Font Families

- Primary Text: `Nunito` (Regular 400, Medium 500, Bold 700)
- Headings & UI Elements: `Montserrat` (Medium 500, Semibold 600, Bold 700)

### Font Weights

- Regular body text: 400
- Medium emphasis: 500
- Section headings: 600
- Main headings: 700

### Text Sizes

- Base body text: 14px
- Small text: text-sm (0.875rem)
- Heading scales:
  - h1: text-4xl (2.25rem)
  - h2: text-3xl (1.875rem)
  - h3: text-2xl (1.5rem)
  - h4: text-xl (1.25rem)

## Colors

### Base Colors

- Background: #0B0D0E (dark)
- Off-dark: #121317
- Primary: #00C6FB
- Purple: #7F5CFF
- Magenta: #FF00EA

### Gray Scale

- Gray-700: #374151
- Gray-800: #1f2937
- Gray-900: #111827

### Glassmorphism Colors

- White glass: bg-white/10 (10% opacity white)
- Border light: border-white/20 (20% opacity white)
- Hover border: border-white/30 (30% opacity white)

### Status Colors

- Success: bg-green-500/20 text-green-400 border-green-500/30
- Warning: bg-yellow-500/20 text-yellow-400 border-yellow-500/30
- Error: bg-red-500/20 text-red-400 border-red-500/30
- Info: bg-blue-500/20 text-blue-400 border-blue-500/30

## Spacing & Layout

### Container

- Max width: max-w-7xl
- Default padding: px-4 sm:px-6 lg:px-8

### Spacing Scale

- Extra small: 0.25rem (1px)
- Small: 0.5rem (2px)
- Medium: 1rem (4px)
- Large: 1.5rem (6px)
- Extra large: 2rem (8px)

### Grid System

- Base grid: grid
- Common columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-3/4/5
- Gap spacing: gap-4 (1rem) to gap-8 (2rem)

## Glassmorphism Effects

### Base Glass Panel

```css
bg-white/10
backdrop-blur-sm
border border-white/20
hover:border-white/30
hover:bg-white/15
```

### Advanced Glass Card

```css
bg-opacity-10
backdrop-filter
backdrop-blur-lg
border border-white/20
shadow-xl
```

### Gradient Overlays

```css
bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20
```

## Animations & Transitions

### Transition Properties

- Duration: duration-300 (300ms)
- Timing: ease-in-out
- Properties: all, transform, opacity

### Common Animations

- Hover scale: hover:scale-[1.02]
- Fade in: opacity-0 to opacity-100
- Slide up: translate-y-4 to translate-y-0
- Pulse: animate-pulse

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Components

### Buttons

```css
/* Primary Button */
px-4 py-2
rounded-lg
bg-gradient-to-r from-blue-500 to-purple-500
text-white font-medium
hover:shadow-lg transition-all duration-300
```

### Cards

```css
/* Glass Card */
relative
bg-white/10 backdrop-blur-sm
border border-white/20
rounded-xl
p-6
hover:border-white/30
transition-all duration-300
```

### Badges

```css
/* Status Badge */
px-2 py-1
text-xs font-medium
rounded-full
backdrop-blur-sm
bg-[color]/60 text-white
```

### Input Fields

```css
/* Glass Input */
bg-white/10
backdrop-blur-sm
border border-white/20
rounded-lg
px-4 py-2
text-white
placeholder-white/50
focus:border-white/30
focus:ring-white/20
```

## Responsive Design

### Breakpoints

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### Container Widths

- Default: 100%
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### Responsive Text

- Base: 14px
- sm: 16px
- lg: 18px
- Headings scale proportionally (use text-[size] classes)

### Layout Adjustments

```css
/* Example of responsive grid */
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-4 sm:gap-6 lg:gap-8
```

## Best Practices

1. **Consistent Spacing**

   - Use standardized spacing scale
   - Maintain vertical rhythm
   - Use gap utilities for consistent spacing between elements

2. **Glass Effect Guidelines**

   - Keep backdrop-blur-sm for better performance
   - Use opacity values between 0.1 and 0.3 for background colors
   - Maintain contrast for accessibility

3. **Animation Performance**

   - Use transform and opacity for smooth animations
   - Implement reduced motion preferences
   - Keep animations subtle and purposeful

4. **Color Usage**

   - Use opacity values consistently (10%, 20%, 30%)
   - Maintain contrast ratios for accessibility
   - Use gradients sparingly for emphasis

5. **Typography Hierarchy**
   - Maintain consistent heading scales
   - Use appropriate font weights for emphasis
   - Keep line heights proportional to text size

This design system documentation provides a foundation for creating consistent, glassmorphic interfaces while maintaining accessibility and performance. Adjust values as needed while keeping the relative relationships intact.
