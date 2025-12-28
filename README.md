# Zillow Landing Page

A modern, responsive landing page for a real estate website built with HTML, CSS, and JavaScript.

## Features

- 🏠 Beautiful hero section with search functionality
- 🔍 Property search and filtering
- 📱 Fully responsive design
- ✨ Smooth animations and interactions
- 🎨 Modern UI/UX design
- 📢 **AdSpace.fun Integration** - Blockchain-based ad display system

## How to Run Locally

### Method 1: Using npm (Recommended)
```bash
# Install dependencies
npm install

# Start the server (opens automatically in browser)
npm start
```
Server will run on: http://localhost:8000

### Method 2: Using npx (No installation needed)
```bash
npx http-server -p 8000
```
Then open: http://localhost:8000

### Method 3: Direct File Opening (Simplest)
1. Navigate to the project folder
2. Double-click `index.html` to open in your browser

### Method 4: Using Python HTTP Server
If you have Python installed:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open: http://localhost:8000

### Method 5: Using VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## File Structure

```
RealEstate/
├── index.html           # Main HTML structure
├── styles.css           # All styling
├── script.js            # JavaScript functionality
├── adspace-config.js    # AdSpace widget configuration (UPDATE SPACE IDs)
├── adspace-widget.js    # AdSpace widget implementation
├── package.json         # Node.js dependencies and scripts
├── .gitignore           # Git ignore file
├── README.md            # This file
└── ADSPACE_SETUP.md     # AdSpace integration setup guide
```

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Edge
- Safari

## AdSpace Integration

This landing page is integrated with **AdSpace.fun** for blockchain-based advertising.

### Quick Setup

1. Create an ad space on [adspace.fun](https://adspace.fun/)
2. Get your Space ID from the dashboard
3. Update `adspace-config.js` with your Space ID
4. The ad will automatically display as a banner after the hero section

**📖 For detailed setup instructions, see [ADSPACE_SETUP.md](./ADSPACE_SETUP.md)**

## Notes

- The search functionality shows alerts (for demo purposes)
- Property data is hardcoded for demonstration
- Images use gradient placeholders
- AdSpace widgets require active campaigns to display ads

