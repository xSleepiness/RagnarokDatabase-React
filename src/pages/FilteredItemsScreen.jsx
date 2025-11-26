import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppTopBar from '../components/AppTopBar';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorCard from '../components/ErrorCard';
import Footer from '../components/Footer';
import ragnarokApiService from '../services/ragnarokApiService';

const FilteredItemsScreen = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const decodedType = decodeURIComponent(type);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [itemTypes, setItemTypes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    loadItems(currentPage);
    loadItemTypes();
  }, [type, currentPage]);

  const loadItems = async (page) => {
    try {
      setLoading(true);
      setError(null);
      const items = await ragnarokApiService.getItemsByType(decodedType, page, itemsPerPage);
      setItems(Array.isArray(items) ? items : []);
      // If we get fewer items than requested, we've reached the end
      setHasMore(items.length === itemsPerPage);
    } catch (err) {
      setError(err.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const loadItemTypes = async () => {
    try {
      const response = await ragnarokApiService.getItemTypes();
      const types = response.types || [];
      setItemTypes(types);
      
      // Calculate total pages for current type
      const typeInfo = types.find(t => t.type === decodedType);
      if (typeInfo) {
        const calculatedTotalPages = Math.ceil(typeInfo.count / itemsPerPage);
        setTotalPages(calculatedTotalPages);
      }
    } catch (err) {
      console.error('Failed to load item types:', err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPage = totalPages || currentPage + 10; // Use totalPages or fallback to estimate
    
    // Always show first page if not near the beginning
    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) {
        pages.push('...');
      }
    }
    
    // Calculate range around current page
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(maxPage, currentPage + 4); // Show up to 4 pages ahead or maxPage
    
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    // Show last page if we're not near the end and totalPages is known
    if (totalPages > 0 && currentPage + 4 < totalPages) {
      if (currentPage + 5 < totalPages) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
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
            {decodedType}
          </h1>
          <p className="text-slate-400">
            Browsing items of type: <span className="text-amber-400 font-semibold">{decodedType}</span>
          </p>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" />
        ) : error ? (
          <ErrorCard message={error} onRetry={() => loadItems(currentPage)} />
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold text-slate-300 mb-2">No items found</h3>
            <p className="text-slate-500">This type doesn't have any items yet</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} compact={true} />
              ))}
            </div>

            {/* Pagination */}
            {(currentPage > 1 || hasMore) && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 sm:px-4 py-2 bg-slate-800 text-slate-200 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors text-sm sm:text-base"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {getPageNumbers().map((pageNum, idx) => {
                    if (pageNum === '...') {
                      return (
                        <span key={`ellipsis-${idx}`} className="text-slate-400 px-2">
                          ...
                        </span>
                      );
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                          currentPage === pageNum
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasMore || (totalPages > 0 && currentPage >= totalPages)}
                  className="px-3 sm:px-4 py-2 bg-slate-800 text-slate-200 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors text-sm sm:text-base"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FilteredItemsScreen;
