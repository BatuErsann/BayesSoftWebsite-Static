# Bayes Digital - Corporate Website

A static corporate website for Bayes Digital, built with Vite, Tailwind CSS, and Handlebars for build-time HTML includes.

## Overview

This is a modern, responsive, and accessible corporate website showcasing digital systems and automation services. The site includes:

- **Home** - Company overview, services highlight, and featured projects
- **Services** - Detailed service offerings (Healthcare, E-commerce, SME, AI, Mobile, IoT)
- **Sectors** - Industry-specific solutions and expertise
- **Projects** - Case studies with Problem/Solution/Outcome/Deliverables format
- **About** - Company story, values, team structure, and approach
- **Contact** - Contact form, office information, and FAQs

## Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/) v5.2.11
- **Templating**: [vite-plugin-handlebars](https://github.com/alexlafroscia/vite-plugin-handlebars) for HTML partials
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3.4.3
- **CSS Processing**: PostCSS with Autoprefixer
- **JavaScript**: Vanilla JS (no framework dependencies)

## Project Structure

```
bayesweb/
├── public/                 # Static assets (favicon, images, etc.)
├── src/
│   ├── components/         # Handlebars partials
│   │   ├── head.html       # Document head (meta, fonts, styles)
│   │   ├── header.html     # Site navigation
│   │   ├── footer.html     # Site footer
│   │   ├── cta-primary.html    # Call-to-action (dark variant)
│   │   ├── cta-secondary.html  # Call-to-action (light variant)
│   │   └── services-grid.html  # Services card grid
│   ├── pages/              # HTML pages
│   │   ├── index.html      # Home page
│   │   ├── services.html   # Services page
│   │   ├── sectors.html    # Sectors page
│   │   ├── projects.html   # Case studies page
│   │   ├── about.html      # About page
│   │   └── contact.html    # Contact page
│   ├── styles/
│   │   └── main.css        # Tailwind CSS + custom styles
│   └── js/
│       └── main.js         # UI interactions
├── dist/                   # Build output (generated)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bayesweb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot-reload:

```bash
npm run dev
```

The site will be available at `http://localhost:5173/` (or another port if 5173 is busy).

### Building for Production

Generate optimized production build:

```bash
npm run build
```

The output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Customization

### Site Configuration

Edit `vite.config.js` to update site-wide variables:

```javascript
context: {
  siteName: 'Bayes Digital',
  email: 'hello@bayesdigital.com',
  phone: '+90 212 XXX XXXX',
  address: 'Maslak, Sarıyer, Istanbul, Turkey'
}
```

### Styling

- **Colors**: Edit `tailwind.config.js` to modify the color palette
- **Typography**: The site uses Inter font family from Google Fonts
- **Custom Components**: See `src/styles/main.css` for custom utility classes

### Adding Pages

1. Create a new HTML file in `src/pages/`
2. Use Handlebars partials: `{{> head}}`, `{{> header}}`, `{{> footer}}`
3. Add the page to `vite.config.js` rollup input configuration

### Adding Components

1. Create a new `.html` file in `src/components/`
2. Include it in pages using `{{> componentName}}`

## Deployment

### Static Hosting

The built site in `dist/` can be deployed to any static hosting service:

- **Netlify**: Drop the `dist/` folder or connect your repository
- **Vercel**: Connect your repository and set build command to `npm run build`
- **GitHub Pages**: Push `dist/` contents to `gh-pages` branch
- **AWS S3**: Upload `dist/` contents to an S3 bucket with static hosting enabled

### Recommended Steps

1. Build the project: `npm run build`
2. Test locally: `npm run preview`
3. Deploy the `dist/` folder to your hosting provider

### Environment-Specific Builds

For different environments, you can use environment variables:

```bash
# Production
npm run build

# Staging (example)
VITE_ENV=staging npm run build
```

## Browser Support

The site supports all modern browsers:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Accessibility

The site follows WCAG 2.1 guidelines:
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus indicators
- Skip-to-content link

## Performance

Optimizations included:
- CSS minification and tree-shaking via Tailwind's JIT compiler
- JavaScript bundling and minification via Vite
- Font loading optimization with `font-display: swap`
- Responsive images (when added to `public/`)
- Gzip/Brotli compression ready

## Maintenance

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update to latest major versions (review breaking changes)
npx npm-check-updates -u
npm install
```

### Adding Content

- **Case Studies**: Add new projects in `src/pages/projects.html`
- **Blog Posts**: Create a new `src/pages/blog/` directory with individual posts
- **Team Members**: Expand the About page or create a dedicated Team page

## License

© 2024 Bayes Digital. All rights reserved.
