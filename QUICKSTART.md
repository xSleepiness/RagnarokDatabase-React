# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Open the Application
The dev server is already running at: **http://localhost:5173**

### 2. Navigate the Application

#### Home Page (/)
- Browse **Popular Items** by time period
- Use the **Search Bar** to find items by name or ID
- See **Total Items Count** in the database
- Click on any item to view details

#### Item Detail (/item/:id)
- View complete item information
- See stats, prices, and requirements
- Upload custom images for items
- Use back button to return

#### Search (/search?q=query)
- Enter query in home search bar
- View matching results
- Click items to see details

#### Filter by Type (/filter/:type)
- Click **Menu** (☰) in top-right
- Select item type from dropdown
- Browse paginated results
- Navigate between pages

### 3. Test Key Features

✅ **Popular Items**: Change period filters (Today, Yesterday, Last 7 Days, Last 30 Days)
✅ **Search**: Try searching for "Potion" or "501"
✅ **Filter**: Use menu to filter by "Healing" or "Weapon"
✅ **Details**: Click any item to see full details
✅ **Navigation**: Use back button and home link

## 📱 Application Features

### Main Screen
- **Header**: Large Ragnarok Database title with Lilita One font
- **Search**: Real-time search with instant navigation
- **Stats**: Shows total items in database
- **Filters**: 4 period options (Today, Yesterday, Last 7 Days, Last 30 Days)
- **Items List**: Popular items with icons, names, types, and view counts

### Item Details
- **Visual**: Large item icon with fallback
- **Info**: Name, ID, Type badge
- **Description**: Full item description
- **Stats**: ATK, MATK, Defense, Weight, Slots
- **Pricing**: Buy and Sell prices
- **Requirements**: Level, Job, Gender, Location
- **Upload**: Image upload button (top right)

### Navigation Menu
- **Home**: Return to main screen
- **Filter by Type**: Quick access to item types with counts
- **Responsive**: Click outside to close

### Search Results
- **Count**: Total results found
- **Results**: List of matching items
- **Empty State**: Friendly message when no results

### Filtered Items
- **Type Header**: Shows selected type
- **Pagination**: Previous/Next buttons
- **Page Numbers**: Up to 5 visible pages
- **Smooth Scroll**: Auto-scroll to top on page change

## 🎨 Design Highlights

### Color Scheme
- **Background**: Dark slate (950, 900, 800)
- **Text**: Light slate (100-300)
- **Accent**: Amber (400) - buttons, highlights, badges
- **Borders**: Slate (700)
- **Errors**: Red (400)

### Typography
- **Headers**: Lilita One (Google Fonts)
- **Body**: System fonts
- **Sizes**: Responsive with mobile-first approach

### Components
- **Cards**: Rounded corners, hover effects, smooth transitions
- **Buttons**: Amber accent, clear active states
- **Loading**: Animated spinner with amber color
- **Errors**: Prominent red display with retry button

## 🔧 Development

### File Organization
```
src/
├── components/      # Reusable UI components
├── pages/          # Main application screens
├── services/       # API service layer
├── utils/          # Helper functions
├── App.jsx         # Routing configuration
└── index.css       # Global styles
```

### Key Technologies
- **React 19**: Latest React with hooks
- **React Router v6**: Client-side routing
- **Axios**: HTTP client with interceptors
- **Tailwind CSS v4**: Utility-first styling
- **Vite**: Lightning-fast dev server

### Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 API Configuration

### Base URL
Located in `src/services/networkModule.js`:
```javascript
const BASE_URL = 'http://64.176.16.51:8000/api/v1/';
```

### Available Endpoints
- Popular items by period
- Item details by ID
- Search items
- Filter by type with pagination
- Get total items count
- Get all item types
- Upload item images
- Get monster details

## 💡 Tips

1. **Images**: Items without images show a placeholder icon
2. **Search**: Works for both item names and numeric IDs
3. **Pagination**: Shows up to 5 page numbers at a time
4. **Menu**: Click anywhere outside to close
5. **Loading**: All API calls show loading states
6. **Errors**: All errors include retry buttons

## 🎯 Next Steps

Try these actions:
1. Search for different items
2. Filter by various types
3. Click through pagination
4. View item details
5. Test the upload feature (if you have permissions)

## 📚 Documentation

See these files for more information:
- `README.md` - Project overview and setup
- `PROJECT_SUMMARY.md` - Complete architecture details
- `src/` - Well-commented source code

---

**Enjoy exploring the Ragnarok Database!** 🎮
