# @voltamon/portfolio

A React component collection featuring animated portfolio sections with GSAP and Framer Motion.

## Features

- **HeroSection** - Animated hero with typewriter effect
- **AboutSection** - Paper plane animation and about content
- **ServicesSection** - Interactive scrolling skill visualizer
- **ContactSection** - Light bulb animation with contact info
- **Navigation** - Smooth animated menu
- Tailwind CSS styling
- GSAP animations
- Framer Motion effects

## Installation

```bash
npm install @voltamon/portfolio react react-dom
```

## Usage

```tsx
import React from 'react'
import {
  Navigation,
  HeroSection,
  AboutSection,
  ServicesSection,
  ContactSection,
} from '@voltamon/portfolio'

export default function App() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </>
  )
}
```

## Components

### HeroSection
Main hero section with animated title and typewriter effect.

### AboutSection
About section with paper plane SVG animation and text content.

### ServicesSection
Interactive services/skills section with scrollable animation.

### ContactSection
Contact section with animated light bulb and CTA.

### Navigation
Animated navigation menu with smooth transitions.

## Styling

All components use Tailwind CSS. Make sure to include Tailwind in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
```

## Dependencies

- React 19.0.0+
- React DOM 19.0.0+
- GSAP 3.13.0+
- Framer Motion 12.23.24+
- Tailwind CSS 4+

## License

MIT

## Author

Voltamon
