# Phoebe Wangeci Memorial Website - Comprehensive Development Guide

## 🌟 Project Overview

This guide provides complete specifications for creating a modern, respectful memorial website honoring **Phoebe Wangeci Macharia**. The website will serve as a digital sanctuary where family, friends, and community members can celebrate her life, share memories, and find comfort.

### Vision Statement

Create an elegant, accessible, and emotionally resonant digital memorial that reflects Phoebe's life, values, and impact on her community, featuring modern web technologies and thoughtful design.

---

## 🛠️ Technical Stack & Requirements

### Core Technologies

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety and better development experience
- **Styling**: Tailwind CSS with custom glassmorphic components
- **State Management**: React Context API for theme management
- **Image Optimization**: Next.js Image component with responsive loading
- **Icons**: Lucide React or Heroicons for consistent iconography

### Development Requirements

- **Node.js**: Version 18.17 or higher
- **Package Manager**: npm, yarn, or pnpm
- **Code Quality**: ESLint + Prettier configuration
- **Git**: Version control with meaningful commit messages
- **Deployment**: Vercel (recommended) or Netlify

### Performance Targets

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Green scores for LCP, FID, CLS
- **Image Optimization**: WebP format with fallbacks
- **Bundle Size**: < 500KB initial load
- **Accessibility**: WCAG 2.1 AA compliance

---

## 🎨 Design System & Specifications

### Glassmorphic Design Principles

```css
/* Core Glassmorphic Properties */
backdrop-filter: blur(10px);
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
border-radius: 16px;
```

### Color Palette

#### Light Theme

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-glass: rgba(255, 255, 255, 0.1);
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --accent-primary: #3b82f6;
  --accent-secondary: #8b5cf6;
  --border-glass: rgba(255, 255, 255, 0.2);
  --shadow-glass: rgba(0, 0, 0, 0.1);
}
```

#### Dark Theme

```css
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-glass: rgba(15, 23, 42, 0.3);
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --accent-primary: #60a5fa;
  --accent-secondary: #a78bfa;
  --border-glass: rgba(255, 255, 255, 0.1);
  --shadow-glass: rgba(0, 0, 0, 0.3);
}
```

### Typography Scale

- **Headings**: Inter or Poppins (Google Fonts)
- **Body Text**: Inter or system fonts
- **Scale**:
  - H1: 3rem (48px) - Hero titles
  - H2: 2.25rem (36px) - Section headers
  - H3: 1.875rem (30px) - Subsections
  - H4: 1.5rem (24px) - Card titles
  - Body: 1rem (16px) - Regular text
  - Small: 0.875rem (14px) - Captions

### Spacing System

```css
/* Tailwind-based spacing */
--space-xs: 0.25rem; /* 4px */
--space-sm: 0.5rem; /* 8px */
--space-md: 1rem; /* 16px */
--space-lg: 1.5rem; /* 24px */
--space-xl: 2rem; /* 32px */
--space-2xl: 3rem; /* 48px */
--space-3xl: 4rem; /* 64px */
```

---

## 📱 Responsive Design Breakpoints

```css
/* Mobile First Approach */
/* xs: 0px - 475px */
/* sm: 476px - 639px */
/* md: 640px - 767px */
/* lg: 768px - 1023px */
/* xl: 1024px - 1279px */
/* 2xl: 1280px+ */
```

### Layout Specifications

- **Mobile**: Single column, full-width cards
- **Tablet**: Two-column grid for content cards
- **Desktop**: Three-column grid with sidebar navigation
- **Large Desktop**: Four-column grid for gallery items

---

## 🏗️ Project Structure

```
phoebe-wangeci-memorial/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── gallery/
│   │   └── page.tsx
│   ├── eulogy/
│   │   └── page.tsx
│   ├── service/
│   │   └── page.tsx
│   ├── tributes/
│   │   └── page.tsx
│   ├── contributions/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── ThemeToggle.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileMenu.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Biography.tsx
│   │   ├── PhotoGallery.tsx
│   │   ├── FeaturedTributes.tsx
│   │   └── ContactInfo.tsx
│   └── providers/
│       └── ThemeProvider.tsx
├── lib/
│   ├── utils.ts
│   ├── constants.ts
│   └── types.ts
├── public/
│   ├── images/
│   │   ├── phoebe/
│   │   ├── gallery/
│   │   └── icons/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── types/
│   ├── index.ts
│   └── tribute.ts
├── package.json
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── README.md
```

---

## 📄 Page Specifications

### 1. Homepage/Landing Page (`/`)

#### Hero Section

- **Layout**: Full viewport height with centered content
- **Elements**:
  - Large portrait photo of Phoebe (optimized, responsive)
  - Full name: "Phoebe Wangeci Macharia"
  - Birth date: [To be provided]
  - Passing date: [To be provided]
  - Brief tribute quote or verse
  - Subtle particle animation or gentle background movement
  - Call-to-action buttons to key sections

#### Quick Navigation Cards

- **Grid**: 2x2 on mobile, 2x3 on tablet, 3x2 on desktop
- **Cards**: About, Gallery, Eulogy, Service, Tributes, Contact
- **Styling**: Glassmorphic cards with hover effects
- **Icons**: Relevant icons for each section

#### Recent Tributes Preview

- **Display**: Latest 3 tributes in card format
- **Link**: "View all tributes" button

### 2. About/Biography Page (`/about`)

#### Timeline Component

```typescript
interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  category: "personal" | "family" | "church" | "business";
  image?: string;
}
```

#### Sections

- **Early Life**: Childhood, education, family background
- **Family Life**: Marriage, children, family values
- **Church Ministry**: PCEA Riruta Satellite involvement
- **Business Ventures**: Professional achievements
- **Community Impact**: Charitable work, mentorship
- **Personal Qualities**: Character traits, hobbies, passions

#### Photo Integration

- **Inline Photos**: Relevant images within each section
- **Photo Captions**: Descriptive text for context
- **Lightbox**: Click to enlarge functionality

### 3. Photo Gallery (`/gallery`)

#### Gallery Features

- **Masonry Layout**: Pinterest-style responsive grid
- **Categories**:
  - All Photos
  - Family Moments
  - Church Life
  - Business Events
  - Special Occasions
  - Candid Memories

#### Lightbox Functionality

```typescript
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  date?: string;
  photographer?: string;
}
```

#### Interactive Features

- **Search**: Filter by caption or category
- **Sorting**: By date, category, or chronological order
- **Sharing**: Individual photo sharing capabilities
- **Download**: High-resolution download option (family only)

### 4. Eulogy Section (`/eulogy`)

#### Content Structure

- **Full Text**: Complete eulogy with proper formatting
- **Reading Time**: Estimated reading duration
- **Audio Player**: Placeholder for audio version
- **Typography**: Enhanced readability with proper line spacing
- **Print Version**: CSS print styles for physical copies

#### Interactive Elements

- **Bookmark**: Save reading position
- **Share**: Social media and email sharing
- **Font Size**: Adjustable text size for accessibility
- **Highlight**: Text selection and highlighting

### 5. Funeral Service Details (`/service`)

#### Service Information

- **Date & Time**: Complete schedule
- **Venue**: Church details with address
- **Program**: Order of service, speakers, hymns
- **Directions**: Embedded map or directions link
- **Live Stream**: Virtual attendance information
- **Contact**: Coordinator contact details

#### Program Layout

```typescript
interface ServiceProgram {
  time: string;
  activity: string;
  speaker?: string;
  hymn?: string;
  scripture?: string;
}
```

### 6. Tributes/Condolences (`/tributes`)

#### Tribute Form

```typescript
interface Tribute {
  id: string;
  name: string;
  email?: string;
  relationship: string;
  message: string;
  isPublic: boolean;
  createdAt: Date;
  approved: boolean;
}
```

#### Form Fields

- **Name**: Required, public display
- **Relationship**: Dropdown (Family, Friend, Church Member, Colleague, etc.)
- **Email**: Optional, for responses
- **Message**: Rich text editor with character limit
- **Privacy**: Option to keep tribute private
- **Photo**: Optional photo upload

#### Display Features

- **Pagination**: Load more tributes
- **Filtering**: By relationship type
- **Moderation**: Admin approval system placeholder
- **Responses**: Family response capability

### 7. Memorial Contributions (`/contributions`)

#### Donation Information

- **Preferred Charities**: List of suggested organizations
- **Send Off Funds**: Specific fund information
- **Contact Details**: How to make contributions
- **Thank You**: Acknowledgment process
- **Transparency**: How funds will be used

#### Charity Cards

```typescript
interface Charity {
  name: string;
  description: string;
  website: string;
  logo: string;
  category: string;
}
```

### 8. Contact Information (`/contact`)

#### Contact Sections

- **Family Contacts**: Primary family members
- **Funeral Home**: Professional services contact
- **Church**: PCEA Riruta Satellite details
- **Website**: Technical support or content updates

#### Contact Form

- **Purpose**: General inquiries, corrections, technical issues
- **Fields**: Name, email, subject, message
- **Response**: Auto-reply with acknowledgment

---

## 🧩 Component Library

### Core UI Components

#### Glass Card Component

```typescript
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}
```

#### Theme Toggle

```typescript
interface ThemeToggleProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}
```

#### Image Gallery Component

```typescript
interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: number;
  showCategories?: boolean;
  enableLightbox?: boolean;
}
```

#### Tribute Card

```typescript
interface TributeCardProps {
  tribute: Tribute;
  showActions?: boolean;
  compact?: boolean;
}
```

### Layout Components

#### Header Navigation

- **Logo/Title**: Site branding
- **Navigation Menu**: Desktop horizontal menu
- **Mobile Menu**: Hamburger menu for mobile
- **Theme Toggle**: Dark/light mode switch
- **Search**: Global search functionality

#### Footer

- **Copyright**: Memorial website copyright
- **Links**: Quick navigation links
- **Contact**: Brief contact information
- **Social**: Social media links (if applicable)

---

## 🎭 Theme System Implementation

### Theme Provider Setup

```typescript
interface ThemeContextType {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  resolvedTheme: "light" | "dark";
}
```

### CSS Custom Properties

```css
/* Implement CSS variables for seamless theme switching */
.glass-card {
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-glass);
  box-shadow: 0 8px 32px var(--shadow-glass);
}
```

### Theme Persistence

- **localStorage**: Save user preference
- **System Detection**: Respect OS theme preference
- **Smooth Transitions**: Animate theme changes

---

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Focus Indicators**: Visible focus states for keyboard navigation
- **Alt Text**: Descriptive alt text for all images
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Screen Reader**: ARIA labels and descriptions

### Keyboard Navigation

- **Tab Order**: Logical tab sequence
- **Skip Links**: Skip to main content
- **Modal Management**: Proper focus trapping
- **Menu Navigation**: Arrow key navigation for menus

### Responsive Text

- **Font Scaling**: Respect user font size preferences
- **Line Height**: Adequate spacing for readability
- **Text Spacing**: Proper letter and word spacing

---

## 🚀 Performance Optimization

### Image Optimization

```typescript
// Next.js Image component usage
<Image
  src="/images/phoebe/portrait.jpg"
  alt="Phoebe Wangeci Macharia"
  width={800}
  height={600}
  priority={true}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Code Splitting

- **Dynamic Imports**: Lazy load non-critical components
- **Route-based Splitting**: Automatic with Next.js App Router
- **Component Splitting**: Split large components

### Caching Strategy

- **Static Assets**: Long-term caching for images and fonts
- **API Routes**: Appropriate cache headers
- **Service Worker**: Offline functionality (optional)

---

## 📝 Content Guidelines

### Sample Content Structure

#### Biography Content

```markdown
## Early Life

Phoebe Wangeci was born in [Year] in [Location], the [position] of [number] children to [parents' names]. From an early age, she displayed [character traits] that would define her throughout her life...

## Family Life

In [Year], Phoebe married [spouse name] and together they built a loving family. Their [number] children - [names] - were the center of her world...

## Church Ministry

Phoebe's faith was the cornerstone of her life. As an active member of PCEA Riruta Satellite, she served in various capacities including [roles]...
```

#### Sample Tributes

```typescript
const sampleTributes: Tribute[] = [
  {
    id: "1",
    name: "Sarah Wanjiku",
    relationship: "Church Member",
    message:
      "Mama Phoebe was a pillar of strength in our church community. Her warm smile and encouraging words touched so many lives...",
    isPublic: true,
    createdAt: new Date(),
    approved: true,
  },
  // More sample tributes...
];
```

### Photo Categories and Descriptions

- **Family Portraits**: Formal and casual family photos
- **Church Events**: Baptisms, confirmations, church services
- **Business Occasions**: Professional events, achievements
- **Community Service**: Charitable work, mentorship activities
- **Personal Moments**: Hobbies, travels, daily life

---

## 🔧 Development Workflow

### Setup Instructions

```bash
# Create Next.js project
npx create-next-app@latest phoebe-wangeci-memorial --typescript --tailwind --eslint --app

# Install additional dependencies
npm install lucide-react framer-motion next-themes

# Development server
npm run dev
```

### Git Workflow

```bash
# Feature branch naming
git checkout -b feature/photo-gallery
git checkout -b fix/mobile-navigation
git checkout -b content/biography-section

# Commit message format
feat: add photo gallery lightbox functionality
fix: resolve mobile menu overlay issue
content: update biography timeline events
```

### Testing Strategy

- **Unit Tests**: Component testing with Jest and React Testing Library
- **Integration Tests**: Page-level functionality testing
- **Accessibility Tests**: Automated a11y testing
- **Performance Tests**: Lighthouse CI integration

---

## 🚀 Deployment Configuration

### Vercel Deployment

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://phoebe-wangeci-memorial.vercel.app
NEXT_PUBLIC_SITE_NAME=Phoebe Wangeci Memorial
```

### SEO Configuration

```typescript
// app/layout.tsx metadata
export const metadata: Metadata = {
  title: "Phoebe Wangeci Macharia - Memorial Website",
  description:
    "A loving tribute to Phoebe Wangeci Macharia - celebrating her life, faith, and impact on our community.",
  keywords: "memorial, tribute, Phoebe Wangeci, PCEA Riruta Satellite",
  authors: [{ name: "Family of Phoebe Wangeci" }],
  openGraph: {
    title: "Phoebe Wangeci Macharia Memorial",
    description: "Celebrating the life and legacy of Phoebe Wangeci Macharia",
    type: "website",
    locale: "en_US",
  },
};
```

---

## 📋 Development Checklist

### Phase 1: Foundation

- [ ] Project setup with Next.js 14+ and TypeScript
- [ ] Tailwind CSS configuration with custom theme
- [ ] Basic project structure and file organization
- [ ] Theme provider and dark/light mode toggle
- [ ] Responsive layout components (Header, Footer)

### Phase 2: Core Pages

- [ ] Homepage with hero section and navigation cards
- [ ] About/Biography page with timeline component
- [ ] Photo gallery with masonry layout and lightbox
- [ ] Eulogy page with enhanced typography
- [ ] Service details page with program information

### Phase 3: Interactive Features

- [ ] Tribute form with validation and submission
- [ ] Contact form with email integration
- [ ] Search functionality across content
- [ ] Mobile-responsive navigation menu
- [ ] Loading states and error boundaries

### Phase 4: Content & Polish

- [ ] Sample content for all sections
- [ ] Placeholder images and photo gallery
- [ ] SEO optimization and meta tags
- [ ] Accessibility testing and improvements
- [ ] Performance optimization and testing

### Phase 5: Deployment

- [ ] Production build optimization
- [ ] Deployment to Vercel or Netlify
- [ ] Domain configuration (if custom domain)
- [ ] Analytics setup (optional)
- [ ] Final testing and quality assurance

---

## 🎯 Success Metrics

### Technical Metrics

- **Performance**: Lighthouse score 90+ across all categories
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Proper meta tags and structured data
- **Responsiveness**: Seamless experience across all devices

### User Experience Metrics

- **Load Time**: < 3 seconds on 3G connection
- **Interaction**: Smooth animations and transitions
- **Navigation**: Intuitive user flow and information architecture
- **Emotional Impact**: Respectful and comforting user experience

---

## 📞 Support & Maintenance

### Content Updates

- **Family Access**: Process for family to request content updates
- **Photo Additions**: System for adding new photos to gallery
- **Tribute Moderation**: Review and approval process for new tributes

### Technical Maintenance

- **Security Updates**: Regular dependency updates
- **Performance Monitoring**: Ongoing performance optimization
- **Backup Strategy**: Content and image backup procedures
- **Domain Renewal**: Annual domain and hosting renewals

---

## 🙏 Final Notes

This memorial website serves as a digital sanctuary to honor Phoebe Wangeci Macharia's life and legacy. Every design decision, technical choice, and content element should reflect the love, respect, and celebration of her impact on family, friends, and community.

The website should feel warm, welcoming, and peaceful while maintaining modern web standards and accessibility. It's not just a technical project, but a heartfelt tribute that will provide comfort and connection for years to come.

**Remember**: This is more than code and design—it's a lasting memorial that will help preserve precious memories and continue Phoebe's legacy of love, faith, and community service.

---

_Last Updated: August 2025_
_Document Version: 1.0_
