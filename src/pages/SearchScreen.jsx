import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AppTopBar from '../components/AppTopBar';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorCard from '../components/ErrorCard';
import Footer from '../components/Footer';
import ragnarokApiService from '../services/ragnarokApiService';

const SearchScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
    loadItemTypes();
  }, [query]);

  const performSearch = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ragnarokApiService.searchItems(searchQuery, 50);
      console.log('Search response:', response);
      setResults(response.items || response || []);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
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
      <AppTopBar showBackButton onBackClick={() => navigate(-1)} itemTypes={itemTypes} />

      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="w-full lg:w-[70%] max-w-screen-xl">
        <div className="mb-6 sm:mb-8">
          <h1
            className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2"
            style={{ fontFamily: "'Lilita One', cursive" }}
          >
            Search Results
          </h1>
          <p className="text-slate-400">
            Showing results for: <span className="text-amber-400 font-semibold">"{query}"</span>
          </p>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" />
        ) : error ? (
          <ErrorCard message={error} onRetry={() => performSearch(query)} />
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 text-slate-700 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-bold text-slate-300 mb-2">No results found</h3>
            <p className="text-slate-500">Try searching with different keywords</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-slate-400">
                Found <span className="text-amber-400 font-semibold">{results.length}</span> {results.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {results.map((item) => (
                <ItemCard key={item.id} item={item} compact={true} />
              ))}
            </div>
          </>
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchScreen;
