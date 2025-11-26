import { useState, useEffect } from 'react';
import AppTopBar from '../components/AppTopBar';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorCard from '../components/ErrorCard';
import Footer from '../components/Footer';
import ragnarokApiService from '../services/ragnarokApiService';
import { formatNumber } from '../utils/helpers';

const MainScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popularItems, setPopularItems] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [totalItemsCount, setTotalItemsCount] = useState(null);
  const [itemTypes, setItemTypes] = useState([]);

  const periods = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
  ];

  useEffect(() => {
    document.title = 'Ragnarok Database - Home';
    loadPopularItems(selectedPeriod);
    loadTotalItemsCount();
    loadItemTypes();
  }, [selectedPeriod]);

  const loadPopularItems = async (period) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ragnarokApiService.getPopularItems(period, 10);
      setPopularItems(response.items || []);
    } catch (err) {
      setError(err.message || 'Failed to load popular items');
    } finally {
      setLoading(false);
    }
  };

  const loadTotalItemsCount = async () => {
    try {
      const count = await ragnarokApiService.getItemCount();
      setTotalItemsCount(count);
    } catch (err) {
      console.error('Failed to load items count:', err);
    }
  };

  const loadItemTypes = async () => {
    try {
      const response = await ragnarokApiService.getItemTypes();
      setItemTypes(response.types || []);
    } catch (err) {
      console.error('Failed to load item types:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col">
      <AppTopBar itemTypes={itemTypes} />

      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="w-full lg:w-[70%] max-w-screen-xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-400 mb-2 leading-tight"
            style={{ fontFamily: "'Lilita One', cursive" }}
          >
            RAGNAROK
          </h1>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-200"
            style={{ fontFamily: "'Lilita One', cursive" }}
          >
            DATABASE
          </h2>
        </div>

        {/* Total Items Count */}
        {totalItemsCount !== null && (
          <div className="bg-slate-800 rounded-xl p-4 mb-8 text-center mx-auto max-w-2xl">
            <p className="text-slate-200">
              There exist <span className="font-bold text-amber-400">{formatNumber(totalItemsCount)}</span> items in the database.
            </p>
          </div>
        )}

        {/* Popular Items Card */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          {/* Title */}
          <h3
            className="text-xl sm:text-2xl font-bold text-slate-100 mb-4 text-center"
            style={{ fontFamily: "'Lilita One', cursive" }}
          >
            POPULAR ITEMS
          </h3>

          {/* Period Filter Chips */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-200 text-sm sm:text-base ${
                  selectedPeriod === period.value
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          {/* Popular Items List */}
          {loading ? (
            <LoadingSpinner size="lg" />
          ) : error ? (
            <ErrorCard message={error} onRetry={() => loadPopularItems(selectedPeriod)} />
          ) : popularItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400">No popular items found for this period.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {popularItems.map((item) => (
                <ItemCard key={item.item_id} item={item} showViewCount={true} compact={true} />
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainScreen;
