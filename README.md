# <p align="center"><img src="https://cdn.gymshark.com/images/branding/gs-icon-text.svg" alt="Gymshark Logo" width="250"/></p>

<p align="center">
  <strong>Gymshark Store Redesign: For higher turnover from user to customer!</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#demo">Demo</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#structure">Project Structure</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## Features

✨ **Modern UI/UX Design** - Sleek, responsive interface optimized for all devices  
🛍️ **Product Browsing** - Browse through men's, women's, and accessories collections  
🔍 **Product Filtering** - Filter products by category, size, price, and more    
🔄 **Animations & Transitions** - Smooth page transitions and interactive elements using Framer Motion  
📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile devices  
⚡ **Performance Optimized** - Fast loading times with code splitting and lazy loading

## Tech Stack

- **React** - Frontend library
- **React Router** - Navigation and routing
- **Styled Components** - Component-based styling
- **Framer Motion** - Animations and transitions
- **Swiper** - Touch-enabled slider
- **Webpack** - Module bundling
- **Babel** - JavaScript compiler
- **Netlify** - Hosting and deployment

## Demo

Visit the live demo: [Gymshark Redesign](https://gymshark-redesign.netlify.app)



## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/gymshark-store.git
   cd gymshark-store
   ```

2. Install dependencies
   ```bash
   npm install
   ```

## Usage

### Development

Start the development server:
```bash
npm run dev
```

This will start the development server at `http://localhost:3000`.

### Building for Production

Build the application for production:
```bash
npm run build
```

This will create optimized production files in the `dist` directory.

## Deployment

This project is configured for easy deployment to Netlify:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`

## Structure

```
gymshark-store/
├── public/           # Static assets and HTML template
├── src/              # Source code
│   ├── assets/       # Images, fonts, and other assets
│   ├── components/   # Reusable React components
│   ├── context/      # React context for state management
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── styles/       # Global styles and variables
│   ├── utils/        # Utility functions
│   ├── App.js        # Main application component
│   └── index.js      # Application entry point
├── .babelrc          # Babel configuration
├── .gitignore        # Git ignore rules
├── netlify.toml      # Netlify deployment configuration
├── package.json      # Project dependencies and scripts
└── webpack.config.js # Webpack configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 