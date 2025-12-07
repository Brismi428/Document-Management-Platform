# Apple.com Clone

A faithful recreation of the Apple homepage with authentic styling and design patterns.

## Features

✓ **Pixel-perfect navigation** - Frosted glass effect with sticky positioning
✓ **Apple SVG icons** - Search, bag, and Apple logo from official specs
✓ **Responsive grid layout** - Product cards with 2-column desktop, 1-column mobile
✓ **Apple typography** - SF Pro Display/Text system fonts with proper fallbacks
✓ **Smooth animations** - Fade-in effects, smooth scrolling, hover states
✓ **Complete footer** - Multi-column footer with all Apple sections
✓ **Apple color system** - Official blue (#0071E3), text colors, gradients

## Structure

```
apple-clone/
├── index.html          # Main homepage
├── css/
│   └── style.css       # Complete Apple styling
├── js/
│   └── main.js         # Interactions and animations
└── README.md           # This file
```

## Design Elements

### Navigation
- **Height**: 44px (Apple standard)
- **Background**: Frosted glass effect (backdrop-filter blur)
- **Sticky positioning** with scroll-based opacity
- Official Apple SVG icons

### Typography
- **Headings**: 56px hero, 48px product titles
- **Body**: -apple-system font stack (SF Pro on macOS)
- **Letter spacing**: Apple's precise specifications
- **Font smoothing**: Antialiased for crisp text

### Colors
- **Primary Blue**: #0071E3 (Apple's signature blue)
- **Text**: #1d1d1f (near-black)
- **Secondary**: #6e6e73 (muted gray)
- **Background**: #fbfbfd (off-white)

### Components
- Hero sections with gradient backgrounds
- Product cards with rounded corners (18px border-radius)
- Promo banners with gradient overlays
- Grid-based footer (5 columns desktop)

## How to View

### Option 1: Double-click
Simply double-click `index.html` to open in your default browser.

### Option 2: Command line
```bash
start index.html          # Windows
open index.html           # macOS
xdg-open index.html       # Linux
```

### Option 3: Local server
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

## Responsive Breakpoints

- **Desktop**: 1024px+ (full navigation, 2-column grid)
- **Tablet**: 768-1024px (hidden nav links, 2-column grid)
- **Mobile**: < 768px (1-column grid, simplified layout)

## Browser Compatibility

✓ Chrome 90+
✓ Firefox 88+
✓ Safari 14+
✓ Edge 90+

## Key Features Implemented

1. **Sticky Navigation** - Stays at top with blur effect
2. **Product Grid** - Responsive 2-column layout
3. **Smooth Animations** - Fade-in on scroll
4. **Apple Icons** - Official SVG paths
5. **Comprehensive Footer** - All sections and links
6. **Promo Banner** - Current Apple promotions
7. **CTA Buttons** - "Learn more" and "Buy" links

## What's Different from Real Apple.com

- No product images (focused on layout/styling)
- Simplified JavaScript (no complex animations)
- Static content (no dynamic loading)
- No e-commerce functionality
- Simplified responsive behavior

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, backdrop-filter, animations
- **Vanilla JavaScript** - No frameworks, pure JS
- **SVG** - Vector icons from Apple

## Credits

Design and brand elements © Apple Inc.
This is a learning project and not affiliated with Apple.

Built to demonstrate Apple's design system and web development best practices.
