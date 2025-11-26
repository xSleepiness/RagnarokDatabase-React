import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppTopBar from '../components/AppTopBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorCard from '../components/ErrorCard';
import Footer from '../components/Footer';
import ragnarokApiService from '../services/ragnarokApiService';
import { getItemImageUrl, formatItemName, formatNumber } from '../utils/helpers';

const ItemDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [item, setItem] = useState(null);
  const [itemTypes, setItemTypes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  useEffect(() => {
    loadItemDetail();
    loadItemTypes();
  }, [id]);

  useEffect(() => {
    if (item) {
      document.title = `${item.name} - Ragnarok Database`;
    }
  }, [item]);

  const loadItemDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ragnarokApiService.getItem(id);
      setItem(data);
    } catch (err) {
      setError(err.message || 'Failed to load item details');
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

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/png') && !file.name.toLowerCase().endsWith('.png')) {
      alert('Please upload a PNG image file');
      return;
    }

    try {
      setUploading(true);
      const result = await ragnarokApiService.uploadItemImage(id, file);
      console.log('Upload result:', result);
      
      // Update timestamp to force image reload
      setImageTimestamp(Date.now());
      
      // Reload item data
      await loadItemDetail();
      
      alert('Image uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      alert(`Failed to upload image: ${err.message}`);
    } finally {
      setUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-950 flex flex-col">
        <AppTopBar showBackButton onBackClick={() => navigate(-1)} itemTypes={itemTypes} />
        <LoadingSpinner size="lg" />
        <Footer />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-950 flex flex-col">
        <AppTopBar showBackButton onBackClick={() => navigate(-1)} itemTypes={itemTypes} />
        <ErrorCard message={error || 'Item not found'} onRetry={loadItemDetail} />
        <Footer />
      </div>
    );
  }

  const displayName = formatItemName(item.name, item.stats?.slots || 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col">
      <AppTopBar showBackButton onBackClick={() => navigate(-1)} itemTypes={itemTypes} />

      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="w-full lg:w-[70%] max-w-screen-xl">
        <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 sm:p-6 border-b border-slate-700">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <img
                  src={`${getItemImageUrl(item.id)}?t=${imageTimestamp}`}
                  alt={item.name}
                  className="w-20 h-20 sm:w-32 sm:h-32 object-contain bg-slate-700 rounded-xl shrink-0 p-2 item-detail-image"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="%23475569" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Cline x1="9" y1="9" x2="15" y2="15"/%3E%3Cline x1="15" y1="9" x2="9" y2="15"/%3E%3C/svg%3E';
                  }}
                />
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-400 mb-1 break-words">{displayName}</h1>
                  <p className="text-sm sm:text-base text-slate-400 mb-2">ID: {item.id}</p>
                  <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-400 rounded-full text-sm font-semibold">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Image Upload Button */}
              <label className="cursor-pointer shrink-0">
                <input
                  type="file"
                  accept="image/png,.png"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-amber-400 text-slate-950 rounded-lg font-semibold hover:bg-amber-500 transition-colors text-sm sm:text-base">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                </div>
              </label>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div className="p-4 sm:p-6 border-b border-slate-700">
              <h2 className="text-lg sm:text-xl font-bold text-slate-200 mb-3">Description</h2>
              <p className="text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          )}

          {/* Stats Section */}
          {item.stats && (
            <div className="p-4 sm:p-6 border-b border-slate-700">
              <h2 className="text-lg sm:text-xl font-bold text-slate-200 mb-4">Stats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {item.stats.atk > 0 && <StatRow label="ATK" value={item.stats.atk} />}
                {item.stats.matk > 0 && <StatRow label="MATK" value={item.stats.matk} />}
                {item.stats.defense > 0 && <StatRow label="Defense" value={item.stats.defense} />}
                {item.stats.weight > 0 && <StatRow label="Weight" value={item.stats.weight} />}
                {item.stats.slots > 0 && <StatRow label="Slots" value={item.stats.slots} />}
              </div>
            </div>
          )}

          {/* Prices Section */}
          <div className="p-4 sm:p-6 border-b border-slate-700">
            <h2 className="text-lg sm:text-xl font-bold text-slate-200 mb-4">Prices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <StatRow label="Buy Price" value={formatNumber(item.buy_price)} suffix=" Zeny" />
              <StatRow label="Sell Price" value={formatNumber(item.sell_price)} suffix=" Zeny" />
            </div>
          </div>

          {/* Requirements Section */}
          {(item.required_level > 0 || item.required_job || item.gender || item.location) && (
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-200 mb-4">Requirements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {item.required_level > 0 && (
                  <StatRow label="Required Level" value={item.required_level} />
                )}
                {item.required_job && <StatRow label="Required Job" value={item.required_job} />}
                {item.gender && <StatRow label="Gender" value={item.gender} />}
                {item.location && <StatRow label="Location" value={item.location} />}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const StatRow = ({ label, value, suffix = '' }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm sm:text-base text-slate-300">{label}</span>
    <span className="text-sm sm:text-base text-amber-400 font-bold">
      {value}{suffix}
    </span>
  </div>
);

export default ItemDetailScreen;
