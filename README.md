# Doable.ai - AI-Powered Automation Platform

A comprehensive, futuristic landing page and platform for Doable.ai, an AI-powered tool creation platform that builds automation workflows, writes code, connects APIs, and creates complete tools from simple descriptions.

## 🚀 Features

### Landing Page Features
- **Hero Section**: Animated typing effect with split-screen layout showcasing real-time tool generation
- **How It Works**: 3-step process with interactive cards and hover effects
- **Key Features**: 6 feature cards with glassmorphism design and smooth animations
- **Use Cases**: 6 practical automation examples with detailed descriptions
- **Product Showcase**: Interactive demo interface with prompt suggestions
- **Why Doable.ai**: Core value propositions with benefit comparisons
- **Social Proof**: Testimonial cards with ratings and reviews
- **Pricing**: 3-tier pricing structure with feature comparisons
- **FAQ**: Accordion-style frequently asked questions
- **Final CTA**: Compelling call-to-action with conversion optimization

### Platform Features
- **Dark Theme**: Comprehensive dark theme inspired by lovable.dev with neon colors
- **Navigation**: Fixed navigation with user menu, search, and upgrade button
- **Dashboard**: Statistics overview, recent projects, and activity feed
- **Tool Creation**: Multi-mode creation (prompt, template, scratch) with AI suggestions
- **Template Gallery**: Categorized templates with ratings and usage stats
- **Workflow Editor**: Visual drag-and-drop editor with nodes and connections
- **Project Management**: Project cards with status indicators and action buttons
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Real-time Updates**: Simulated real-time activity and statistics updates
- **Create Page**: Dedicated typing platform for tool creation with prompt suggestions

### Technical Features
- **Modern CSS**: CSS Grid, Flexbox, custom properties, and animations
- **JavaScript ES6+**: Classes, async/await, and modern DOM manipulation
- **Glassmorphism**: Frosted glass effects with backdrop filters
- **Dark Theme**: Comprehensive dark theme with CSS custom properties
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Optimized loading, lazy animations, and efficient rendering

## 📁 Project Structure

```
doable-ai/
├── index.html              # Main landing page
├── platform.html            # Platform dashboard
├── editor.html              # Workflow editor interface
├── create.html              # Tool creation interface with typing platform
├── css/
│   ├── style.css            # Landing page styles
│   └── platform.css         # Platform dark theme styles
├── js/
│   ├── script.js            # Landing page interactions
│   ├── platform.js           # Platform functionality
│   └── editor.js            # Workflow editor functionality
└── README.md                # This file
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-color: #3A8DFF;        /* Neon Blue */
--secondary-color: #1E1E2A;      /* Deep Slate */
--accent-color: #00F2C9;        /* Electric Teal */
--background-color: #0F0F17;     /* Midnight Grey */
--text-primary: #FFFFFF;       /* White */
--text-secondary: #B0B0C0;       /* Soft Grey */

/* Status Colors */
--status-success: #10B981;
--status-warning: #F59E0B;
--status-error: #EF4444;
--status-info: #3A8DFF;
```

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace Font**: JetBrains Mono for code
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Spacing System
```css
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
--spacing-2xl: 3rem;
--spacing-3xl: 4rem;
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 20px;
--radius-full: 50%;
```

## 🔧 Installation & Setup

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser for the landing page
3. **Open** `platform.html` for the platform interface
4. **Open** `editor.html` for the workflow editor

No build process or dependencies required - everything runs in the browser!

## 🚀 Usage

### Landing Page
- Navigate through sections using the navigation menu
- Interact with demo elements and animations
- Explore different use cases and features
- View pricing and FAQ sections

### Platform
- Use the search bar to find tools and templates
- Create new tools using prompt, template, or scratch modes
- Manage projects with the dashboard interface
- Edit workflows in the visual editor
- Monitor activity and statistics
- Use the create page for dedicated tool creation with typing platform

### Workflow Editor
- Drag nodes from the sidebar to the canvas
- Connect nodes to create workflows
- Configure node properties in the properties panel
- Test and run workflows
- Save and export workflow configurations

## 🎯 Key Interactions

### Landing Page
- **Hero Animation**: Typewriter effect with gradient text
- **Scroll Animations**: Fade-in effects on section scroll
- **Hover Effects**: Card elevation and border glow
- **Interactive Demo**: Working prompt input with suggestions

### Platform
- **Mode Switching**: Toggle between prompt, template, and scratch modes
- **Template Gallery**: Filter and select templates by category
- **Project Management**: Run, edit, and delete projects
- **Real-time Updates**: Activity feed and statistics updates

### Editor
- **Drag & Drop**: Create nodes by dragging from toolbox
- **Node Selection**: Click to select and configure nodes
- **Connection Creation**: Drag between connection points
- **Property Editing**: Real-time updates to node properties

## 📱 Responsive Design

### Mobile (≤ 768px)
- Stacked navigation with hamburger menu
- Single-column layouts for all sections
- Touch-friendly buttons and interactions
- Simplified animations for performance

### Tablet (769px - 1024px)
- Collapsible sidebar navigation
- Adjusted grid layouts
- Optimized touch interactions
- Maintained visual hierarchy

### Desktop (≥ 1025px)
- Full navigation with hover effects
- Multi-column grid layouts
- Advanced hover animations
- Complete feature set

## 🎭 Animations & Effects

### CSS Animations
- **Fade In**: Smooth entrance animations
- **Slide In**: Directional movement effects
- **Pulse**: Attention-grabbing pulses
- **Typing**: Typewriter text effect
- **Glow**: Neon glow effects

### JavaScript Animations
- **Scroll-triggered**: Intersection Observer API
- **Interactive**: Hover and click responses
- **Progressive**: Performance-optimized
- **Customizable**: Easy to modify timing

## 🔒 Browser Compatibility

### Modern Browsers
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Required Features
- CSS Grid and Flexbox
- CSS Custom Properties
- Intersection Observer API
- ES6+ JavaScript features

## 🚀 Performance Optimizations

### CSS Optimizations
- Efficient selectors
- Hardware-accelerated animations
- Optimized font loading
- Minimal reflows

### JavaScript Optimizations
- Debounced event handlers
- Efficient DOM queries
- Event delegation
- Lazy loading

### Image Optimizations
- SVG icons where possible
- Efficient image formats
- Responsive images
- Lazy loading

## 🎨 Customization

### Colors
Modify CSS custom properties in `platform.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}
```

### Typography
Change font families in CSS:
```css
body {
    font-family: 'Your Font', sans-serif;
}
```

### Animations
Adjust animation timings:
```css
--transition-fast: all 0.15s ease;
--transition-normal: all 0.3s ease;
--transition-slow: all 0.5s ease;
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across browsers
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the browser console for errors
2. Verify browser compatibility
3. Test with different screen sizes
4. Review the code for custom modifications

## 🎉 Acknowledgments

- Inspired by lovable.dev and modern AI platforms
- Built with vanilla HTML, CSS, and JavaScript
- Icons from Font Awesome
- Fonts from Google Fonts
- Color inspiration from modern dark themes

---

**Built with ❤️ for the future of AI-powered automation**
