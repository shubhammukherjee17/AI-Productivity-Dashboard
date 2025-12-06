# 🎨 Design Documentation - UI Color Palette & Layout

## Overview
This document describes the design system, color palette, and layout structure of the AI Productivity Dashboard, based on the provided screenshot design.

---

## 📐 Layout Structure

### Main Dashboard (3-Column Layout)

```
┌─────────────────────────────────────────────────────────────────┐
│  Welcome, Nexila                     [Search]    [👤]  My meetings [📅] │
├─────────────────┬──────────────────────┬──────────────────────────┤
│                 │                      │                          │
│  Profile        │  Prioritized Tasks   │  Quick Daily Meeting     │
│  [Avatar]       │  83%                 │  08:15 am                │
│  Nexila         │  ───────────────     │                          │
│  👥 11 ✅ 56    │  Additional Tasks    │  John Onboarding        │
│  🏆 12          │  56%                 │  09:30 pm                │
│                 │  ───────────────     │                          │
│                 │  Trackers Connected  │  Call With a New Team   │
│                 │  3 Active: G F R     │  02:30 pm                │
│                 │  [Manage] ●●●        │                          │
│                 │                      │  Lead Designers Event   │
│                 │                      │  04:00 pm                │
│                 │                      │                          │
│                 │                      │  Developed areas        │
│                 │                      │  Sport Skills: ▓▓▓░ 71% │
│                 │                      │  Blogging: ▓▓▓▓▓░ 92%   │
│                 │                      │  Leadership: ▓░░░░░ 33% │
│                 │                      │  Meditation: ▓▓▓░░░ 56% │
│                 │                      │  Philosophy: ▓▓▓▓░░ 79% │
│                 │                      │                          │
├─────────────────┴──────────────────────┴──────────────────────────┤
│                                                                     │
│  Focusing                                    [Range: Last month ▼] │
│  Productivity analytics                                            │
│  ╭─────────────────────────────────────────────────────────────╮ │
│  │ [Line Chart showing productivity trend over Aug-Nov]        │ │
│  │ 4500                                                        │ │
│  │      ╱╲        ╱╲                                          │ │
│  │  ╱╲╱  ╲  ╱╲╱  ╲                                          │ │
│  ╰─────────────────────────────────────────────────────────────╯ │
│                                                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Palette

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Primary Blue** | `#2563eb` | rgb(37, 99, 235) | Buttons, links, accents |
| **Success Green** | `#10b981` | rgb(16, 185, 129) | Completed tasks, positive |
| **Error Red** | `#ef4444` | rgb(239, 68, 68) | High priority, urgent |
| **Warning Amber** | `#f59e0b` | rgb(245, 158, 11) | Medium priority, alerts |
| **Secondary Purple** | `#8b5cf6` | rgb(139, 92, 246) | Secondary actions |

### Gradient Colors

#### Prioritized Tasks Card
```css
background: linear-gradient(135deg, #ffd6d6 0%, #ffc5f0 100%);
/* Pink to Light Pink/Magenta gradient */
```
- **Start**: `#ffd6d6` - Light Pink
- **End**: `#ffc5f0` - Light Magenta
- **Angle**: 135deg (diagonal)

#### Additional Tasks Card
```css
background: linear-gradient(135deg, #c2e8ff 0%, #d8c5ff 100%);
/* Cyan to Light Purple gradient */
```
- **Start**: `#c2e8ff` - Light Cyan
- **End**: `#d8c5ff` - Light Purple
- **Angle**: 135deg (diagonal)

#### AI Insights Card
```css
background: linear-gradient(135deg, #eff6ff 0%, #faf5ff 100%);
/* Light Blue to Light Purple gradient */
```
- **Start**: `#eff6ff` - Very Light Blue
- **End**: `#faf5ff` - Very Light Purple
- **Angle**: 135deg (diagonal)

### Neutral Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **White** | `#ffffff` | Background, cards |
| **Light Gray** | `#f9fafb` | Page background |
| **Gray 100** | `#f3f4f6` | Dividers, subtle background |
| **Gray 200** | `#e5e7eb` | Borders, input backgrounds |
| **Gray 400** | `#9ca3af` | Secondary text |
| **Gray 600** | `#4b5563` | Body text |
| **Gray 900** | `#111827` | Headings, primary text |
| **Black** | `#000000` | Overlays, shadows |

---

## 🖼️ Component Styling

### Profile Card
```tsx
<div className="card-lg p-6 animate-slideIn">
  {/* Avatar: 112px circle with yellow border */}
  <div className="w-28 h-28 rounded-full border-4 border-yellow-400 
                  bg-gradient-to-br from-blue-400 to-blue-500
                  flex items-center justify-center">
    {/* Inner placeholder: 96px blue circle */}
    <div className="w-24 h-24 rounded-full bg-blue-300" />
  </div>
  
  {/* Name and badges */}
  <div className="text-sm font-semibold">Shubham Mukherjee</div>
  
  {/* Badge styles */}
  <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 
                   border border-red-200">
    👥 11
  </span>
</div>
```

**Styling Details:**
- Card: Light background with subtle shadow
- Avatar: Blue gradient with yellow border (4px)
- Badges: Colored background with matching text and border
- Font: Semibold 14px name, smaller stats

### Stat Cards (Gradient)

```tsx
<div className="card-lg p-6 rounded-3xl"
     style={{ background: 'linear-gradient(135deg, #ffd6d6 0%, #ffc5f0 100%)' }}>
  <div className="text-sm text-gray-700 font-medium">Prioritized Tasks</div>
  <div className="text-5xl font-bold text-gray-900">83%</div>
  <div className="text-xs text-gray-600 mt-2">Avg. Completed</div>
</div>
```

**Styling Details:**
- Border radius: 24px (3xl)
- Padding: 1.5rem (6)
- Text color: Dark gray on gradient background
- Percentage: 48px bold text
- Icon: 18px emoji

### Trackers Connected Card

```tsx
<div className="card p-3 flex items-center justify-between gap-4">
  <div>
    <div className="text-sm font-medium">Trackers Connected</div>
    <div className="text-xs text-gray-600">3 Active Connections</div>
  </div>
  
  {/* Avatar circles with overlap */}
  <div className="flex items-center gap-2">
    <div className="flex -space-x-1">
      {/* Each avatar: 32px circle */}
      <div className="w-8 h-8 rounded-full 
                      bg-gradient-to-br from-blue-400 to-blue-600
                      flex items-center justify-center text-white 
                      text-xs font-bold border-2 border-white">
        G
      </div>
      {/* Repeat for F and R */}
    </div>
    <button className="btn btn-primary text-xs">Manage</button>
  </div>
</div>
```

**Styling Details:**
- Avatar size: 32px
- Negative margin: -4px (overlap effect)
- Border: 2px white (separation)
- Font: 10px bold white text
- Gradients per service:
  - Google: Blue
  - Figma: Purple
  - Framer: Pink

### Meetings List Card

```tsx
<div className="card-lg p-5">
  <div className="flex items-center justify-between mb-4">
    <h5 className="font-semibold text-gray-900">My meetings</h5>
    <div className="w-8 h-8 rounded-full bg-blue-600 
                    text-white flex items-center justify-center">
      📅
    </div>
  </div>
  
  {meetings.map(m => (
    <div className="pb-3 border-b border-gray-100 last:border-b-0">
      <div className="text-xs text-gray-500">{m.date} • {m.time}</div>
      <div className="font-medium text-gray-900">{m.title}</div>
    </div>
  ))}
  
  <div className="text-center text-xs text-blue-600 mt-3 cursor-pointer">
    See all meetings ›
  </div>
</div>
```

**Styling Details:**
- Card padding: 1.25rem (5)
- Title icon: 32px circle, blue background
- Meeting item: 12px spacing between items
- Date text: 12px gray
- Title: 14px medium gray
- Link: 12px blue, cursor pointer

### Developed Areas Card

```tsx
<div className="card-lg p-5">
  <h5 className="font-semibold text-gray-900 mb-4">Developed areas</h5>
  
  {areas.map(d => (
    <div key={d.label}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-gray-700">{d.label}</span>
        <span className="text-xs text-gray-500">{d.pct}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div style={{ width: `${d.pct}%`, background: d.color }}
             className="h-full rounded-full transition-all duration-500" />
      </div>
    </div>
  ))}
</div>
```

**Progress Bar Colors:**
- Sport Skills: `#f59e0b` (Amber)
- Blogging: `#3b82f6` (Blue)
- Leadership: `#ef4444` (Red)
- Meditation: `#10b981` (Green)
- Philosophy: `#8b5cf6` (Purple)

**Styling Details:**
- Progress bar height: 8px (h-2)
- Border radius: 9999px (fully rounded)
- Background: Gray 200
- Animation: 500ms transition

---

## 🎭 Animations

### Slide-In Animation
```css
@keyframes slideIn {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out forwards;
}
```

### Fade-In Animation
```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
```

### Slide-Up Animation
```css
@keyframes slideUp {
  from {
    transform: translateY(12px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

---

## 📐 Spacing & Typography

### Font Sizes
- **Display**: 48px (5xl) - Large numbers
- **Heading 1**: 32px (2xl) - Section titles
- **Heading 2**: 20px (lg) - Card titles
- **Heading 3**: 16px (base) - Subheadings
- **Body**: 14px (sm) - Main content
- **Small**: 12px (xs) - Secondary text
- **Tiny**: 11px (2xs) - Labels

### Font Weights
- **Bold**: 700 (Numbers, headings)
- **Semibold**: 600 (Card titles)
- **Medium**: 500 (Subheadings)
- **Regular**: 400 (Body text)

### Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px (4)
- **xl**: 24px (6)
- **2xl**: 32px (8)

---

## 🔌 Shadow & Border Radius

### Cards
- **Border Radius**: 12px (rounded-lg) or 24px (rounded-3xl)
- **Shadow**: Subtle elevation
- **Border**: None or 1px light gray

### Buttons
- **Border Radius**: 8px (rounded-lg)
- **Padding**: 8px 16px (px-4 py-2)
- **Shadow**: None or subtle hover

### Progress Bars
- **Border Radius**: 9999px (fully rounded)
- **Height**: 8px (h-2)
- **Background**: Light gray

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Layout Changes
```tsx
// 3-column on desktop, 1-column on mobile
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Profile */}
  {/* Stats + Trackers */}
  {/* Meetings + Areas */}
</div>
```

---

## 🎯 Design Principles

1. **Clarity**: Clear hierarchy and organization
2. **Consistency**: Uniform spacing and colors
3. **Accessibility**: High contrast and readable text
4. **Efficiency**: Quick visual scanning
5. **Modern**: Clean, minimal aesthetic
6. **Responsive**: Works on all devices

---

## 📋 Component Checklist

- ✅ Profile card with avatar
- ✅ Gradient stat cards
- ✅ Tracker avatars with overlap
- ✅ Meetings list with timestamps
- ✅ Progress bars with colors
- ✅ Smooth animations
- ✅ Responsive layout
- ✅ Color-coded UI elements

---

## 🎨 How to Modify Colors

### Change Primary Brand Color
Edit `tailwind.config.ts`:
```typescript
extend: {
  colors: {
    primary: '#your-color', // Change from #2563eb
  }
}
```

### Update Gradient Cards
In component files:
```tsx
style={{ 
  background: 'linear-gradient(135deg, #your-start 0%, #your-end 100%)' 
}}
```

### Progress Bar Colors
In component data:
```typescript
const areas = [
  { label: 'Skill', pct: 71, color: '#your-color' },
]
```

---

**Design Status**: ✅ Complete & Implemented  
**Last Updated**: December 5, 2025  
**All Components**: Using design system
