# Ragnarok Database - React

A web application built with React that displays items and monsters from Ragnarok Online. This is the React version of the Android application.

## Features

- 🏠 **Main Screen**: Browse popular items by time period (Today, Yesterday, Last 7 Days, Last 30 Days)
- 🔍 **Search**: Search for items and monsters by name or ID
- 📋 **Item Details**: View detailed information about items including stats, prices, and requirements
- 🏷️ **Filter by Type**: Browse items filtered by their type with pagination
- 📸 **Image Upload**: Upload custom images for items
- 🎨 **Dark Theme**: Beautiful dark theme matching the Android app design

## Tech Stack

- **React 19** - UI library
- **React Router DOM** - Navigation and routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppTopBar.jsx   # Navigation bar with menu
│   ├── ItemCard.jsx    # Item list card component
│   ├── ErrorCard.jsx   # Error display component
│   └── LoadingSpinner.jsx # Loading indicator
├── pages/              # Main application screens
│   ├── MainScreen.jsx  # Home page with popular items
│   ├── ItemDetailScreen.jsx # Item details page
│   ├── SearchScreen.jsx # Search results page
│   └── FilteredItemsScreen.jsx # Filtered items by type
├── services/           # API service layer
│   ├── networkModule.js # Axios configuration
│   └── ragnarokApiService.js # API endpoints
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions
├── App.jsx             # Main app component with routing
└── main.jsx            # App entry point
```

## API Endpoints

The application consumes the following API endpoints:

- `GET /items/popular/{period}` - Get popular items
- `GET /items/{id}` - Get item details by ID
- `GET /items/search?query={query}` - Search items
- `GET /items/type?type={type}&page={page}` - Get items by type with pagination
- `GET /items/count` - Get total items count
- `GET /items/types` - Get all item types with counts
- `POST /items/{id}/upload-image` - Upload item image
- `GET /monsters/{id}` - Get monster details by ID

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Configuration

The API base URL is in `src/services/networkModule.js`:

```javascript
const BASE_URL = 'http://64.176.16.51:8000/api/v1/';
```

Update this URL to point to your own API server if needed.

## Design

Dark theme with:
- **Background**: Slate 950, 900, 800
- **Text**: Slate 100-300
- **Accent**: Amber 400
- **Headers**: Lilita One font

## Related Projects

- [Ragnarok Database Android](https://github.com/xSleepiness/RagnarokDatabase) - Original Android app
