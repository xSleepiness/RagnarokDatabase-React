import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './pages/MainScreen';
import ItemDetailScreen from './pages/ItemDetailScreen';
import SearchScreen from './pages/SearchScreen';
import FilteredItemsScreen from './pages/FilteredItemsScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/item/:id" element={<ItemDetailScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/filter/:type" element={<FilteredItemsScreen />} />
      </Routes>
    </Router>
  );
}

export default App
