import { Link } from 'react-router-dom';
import { getItemIconUrl, formatItemName } from '../utils/helpers';

const ItemCard = ({ item, showViewCount = false, compact = false }) => {
  const displayName = formatItemName(item.name, item.stats?.slots || item.slots || 0);

  if (compact) {
    return (
      <Link to={`/item/${item.id || item.item_id}`} className="block">
        <div className="bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-200 border border-slate-700 hover:border-amber-400/50 px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Item Icon - 24x24 */}
            <div className="shrink-0">
              <img
                src={getItemIconUrl(item.id || item.item_id)}
                alt={item.name}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23475569" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Cline x1="9" y1="9" x2="15" y2="15"/%3E%3Cline x1="15" y1="9" x2="9" y2="15"/%3E%3C/svg%3E';
                }}
              />
            </div>

            {/* Item Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm text-slate-100 font-semibold truncate">
                {displayName}
              </h3>
              <p className="text-xs text-slate-400">ID: {item.id || item.item_id}</p>
            </div>

            {/* View Count */}
            {showViewCount && item.view_count !== undefined && (
              <div className="flex-shrink-0">
                <span className="text-xs text-amber-400 font-semibold">
                  {item.view_count}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/item/${item.id || item.item_id}`}>
      <div className="bg-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-slate-700 transition-all duration-200 border border-slate-700 hover:border-amber-400/50">
        <div className="flex items-center space-x-4">
          {/* Item Icon */}
          <div className="flex-shrink-0">
            <img
              src={getItemIconUrl(item.id || item.item_id)}
              alt={item.name}
              className="w-14 h-14 object-contain bg-slate-700 rounded-lg"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="%23475569" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Cline x1="9" y1="9" x2="15" y2="15"/%3E%3Cline x1="15" y1="9" x2="9" y2="15"/%3E%3C/svg%3E';
              }}
            />
          </div>

          {/* Item Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base text-slate-100 font-semibold truncate">
              {displayName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">{item.type}</p>
            {showViewCount && item.view_count !== undefined && (
              <p className="text-amber-400 text-sm">
                {item.view_count} {item.view_count === 1 ? 'view' : 'views'}
              </p>
            )}
          </div>

          {/* Arrow Icon */}
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
