# 🎨 Disaster Alert Application - Design Documentation

## Figma Design Guide

This document outlines the design system and Figma workflow for the Disaster Alert Web Application.

## 🎯 Design Philosophy

### Core Principles
1. **Urgency**: Design conveys immediate action required
2. **Clarity**: Information is easy to scan and understand
3. **Accessibility**: WCAG 2.1 AA compliant
4. **Responsiveness**: Works seamlessly on all devices

## 🎨 Color System

### Primary Colors
```css
--primary-color: #dc2626    /* Alert Red */
--secondary-color: #ea580c   /* Warning Orange */
```

### Alert Level Colors
```css
--critical-color: #b91c1c   /* Critical - Dark Red */
--warning-color: #f59e0b    /* Warning - Amber */
--watch-color: #3b82f6      /* Watch - Blue */
--success-color: #10b981    /* Safe - Green */
```

### Background Colors
```css
--dark-bg: #0f172a         /* Primary Background */
--light-bg: #1e293b        /* Section Background */
--card-bg: #334155         /* Card Background */
```

### Text Colors
```css
--text-light: #ffffff      /* Primary Text */
--text-gray: #cbd5e1       /* Secondary Text */
```

## 📐 Layout & Grid System

### Container
- **Max Width**: 1200px
- **Padding**: 0 20px
- **Centered**: margin: 0 auto

### Breakpoints
```css
Desktop:  > 992px
Tablet:   768px - 992px
Mobile:   < 768px
```

### Grid System
- **Stats Grid**: 4 columns (2 on tablet, 1 on mobile)
- **Alerts Grid**: Auto-fill with min 350px
- **Types Grid**: 3 columns (2 on tablet, 1 on mobile)
- **Footer Grid**: 3 columns (1 on mobile)

## 📱 Components

### 1. Navigation Bar
- **Height**: 70px
- **Position**: Fixed top
- **Background**: Dark with red border bottom
- **Logo**: Icon + Text with pulsing animation
- **Links**: Horizontal on desktop, hamburger on mobile

### 2. Hero Section
- **Min Height**: 80vh
- **Background**: Gradient dark to light
- **Alert Badge**: Floating badge with bounce animation
- **CTA Buttons**: Primary (gradient) + Secondary (outline)
- **Emergency Banner**: Contact information card

### 3. Alert Cards
- **Dimensions**: Auto-fit grid
- **Border Left**: 5px colored by alert level
- **Padding**: 25px
- **Hover**: Slide right + shadow effect
- **Elements**:
  - Header (icon + title + level badge)
  - Body (location + description)
  - Footer (timestamp + affected count)

### 4. Stat Cards
- **Layout**: Icon + Stats side by side
- **Background**: Card background
- **Hover**: Translate up 5px
- **Number Size**: 2.5rem
- **Label Size**: 0.9rem

### 5. Subscribe Form
- **Layout**: 2-column responsive form
- **Input Style**: Dark background with red border on focus
- **Checkboxes**: Custom styled
- **Radio Buttons**: Custom styled
- **Submit Button**: Large primary gradient

### 6. Disaster Type Cards
- **Layout**: 3-column grid
- **Icon Size**: 3.5rem
- **Hover Effect**: Border + translate up + shadow
- **Alignment**: Center

### 7. Map Section
- **Map Height**: 500px
- **Background**: Card background
- **Legend**: Colored boxes with descriptions

## 🖼️ Figma Artboards

### Required Artboards

1. **Desktop - Home** (1920x1080)
   - Full hero section
   - Stats dashboard
   - Active alerts section

2. **Desktop - Alert Details** (1920x1080)
   - Detailed alert view
   - Map integration
   - Related alerts

3. **Desktop - Subscribe** (1920x1080)
   - Subscription form
   - Info boxes
   - Success state

4. **Tablet - Home** (768x1024)
   - Responsive layout
   - 2-column grids
   - Touch-friendly buttons

5. **Mobile - Home** (375x812)
   - Single column layout
   - Hamburger menu
   - Stacked elements

6. **Mobile - Alert Card** (375x812)
   - Full-screen alert details
   - Swipe interactions

## 🎭 Interactions & Animations

### Hover Effects
```css
/* Buttons */
transform: translateY(-3px)
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5)

/* Cards */
transform: translateX(10px) or translateY(-5px)

/* Links */
color: var(--primary-color)
```

### Loading States
- Pulse animation for alert badge
- Skeleton screens for alert cards
- Spinner for form submission

### Transitions
```css
transition: all 0.3s ease
```

## 🔤 Typography

### Font Family
```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

### Font Sizes
```css
Hero Title:      3.5rem (2.5rem on mobile)
Section Title:   2.5rem (2rem on mobile)
Card Title:      1.3rem
Body Text:       1rem
Small Text:      0.9rem
```

### Font Weights
```css
Normal:  400
Medium:  500
Semibold: 600
Bold:    700
```

## 🎯 Iconography

### Icon Library
**Font Awesome 6.4.0**

### Key Icons
```
Alert:          fa-exclamation-triangle
Bell:           fa-bell
Map:            fa-map-marked-alt
Fire:           fa-fire-alt
Water:          fa-water
Wind:           fa-wind
Earthquake:     fa-house-damage
Users:          fa-users
Clock:          fa-clock
Location:       fa-map-marker-alt
Phone:          fa-phone
Email:          fa-envelope
```

### Icon Sizes
```css
Navigation:     1.8rem
Section Icons:  3rem - 5rem
Card Icons:     1.5rem
Small Icons:    1rem - 1.2rem
```

## 📋 Design Checklist

### Figma File Structure
- [ ] Cover page with project info
- [ ] Design system page (colors, typography, components)
- [ ] Desktop artboards (3-5 screens)
- [ ] Tablet artboards (2-3 screens)
- [ ] Mobile artboards (3-5 screens)
- [ ] Component library
- [ ] Style guide page

### Component Library
- [ ] Buttons (primary, secondary, large)
- [ ] Input fields (text, email, phone, checkbox, radio)
- [ ] Cards (alert, stat, info, type)
- [ ] Navigation (desktop, mobile)
- [ ] Badges (alert levels)
- [ ] Icons set
- [ ] Typography styles

### Responsive Design
- [ ] Desktop layout (1920px)
- [ ] Laptop layout (1366px)
- [ ] Tablet layout (768px)
- [ ] Mobile layout (375px)
- [ ] Touch targets minimum 44x44px
- [ ] Readable text sizes on mobile

### Accessibility
- [ ] Color contrast ratio (4.5:1 minimum)
- [ ] Focus states for interactive elements
- [ ] Keyboard navigation support
- [ ] Screen reader friendly structure
- [ ] Alternative text for images/icons

## 🚀 Implementation Notes

### From Figma to Code

1. **Export Assets**
   - Icons as SVG
   - Images optimized (WebP format)
   - Design tokens as CSS variables

2. **CSS Variables**
   ```css
   :root {
       /* Export from Figma styles */
   }
   ```

3. **Component Mapping**
   - Figma Component → HTML Element
   - Auto Layout → Flexbox/Grid
   - Constraints → Media queries

4. **Responsive Strategy**
   - Mobile-first approach
   - CSS Grid for layout
   - Flexbox for components

## 📸 Design Deliverables

### For Developers
- [ ] Figma share link (view access)
- [ ] Exported CSS variables
- [ ] Asset package (icons, images)
- [ ] Style guide documentation
- [ ] Component specifications

### For Stakeholders
- [ ] Design presentation
- [ ] Interactive prototype
- [ ] User flow diagrams
- [ ] Responsive mockups

## 🔗 Figma Resources

### Plugins to Use
- **Stark**: Accessibility checking
- **Contrast**: Color contrast validation
- **Content Reel**: Generate placeholder content
- **Unsplash**: Stock images
- **Iconify**: Icon management

### Design System Tools
- **Styles**: Colors, text styles, effects
- **Components**: Reusable UI elements
- **Variants**: Button states, card types
- **Auto Layout**: Responsive components

## 📝 Design Review Checklist

- [ ] All screens designed for 3 breakpoints
- [ ] Consistent spacing and padding
- [ ] Proper color contrast
- [ ] Hover and active states defined
- [ ] Error states included
- [ ] Loading states designed
- [ ] Empty states considered
- [ ] Success messages designed
- [ ] Form validation visual feedback
- [ ] Navigation flows clear

## 🎨 Style Guide Quick Reference

### Spacing Scale
```
4px   8px   12px  16px  20px  24px  32px  40px  48px  64px  80px
```

### Border Radius
```
Small:  5px
Medium: 8px
Large:  12px
Pill:   50px
```

### Shadows
```css
--shadow: 0 10px 30px rgba(0, 0, 0, 0.5)
```

### Z-Index Scale
```
Modal:      1000
Navbar:     1000
Dropdown:   500
Tooltip:    300
```

---

## 📚 Additional Resources

- [Figma Best Practices](https://www.figma.com/best-practices/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Responsive Design Patterns](https://responsivedesign.is/patterns/)

**Design System Version**: 1.0  
**Last Updated**: 2024  
**Designer**: Your Name
