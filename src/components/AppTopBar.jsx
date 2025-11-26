import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AppTopBar = ({ title = 'RAGNAROK DATABASE', showBackButton = false, onBackClick, itemTypes = [] }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="bg-slate-800/95 backdrop-blur-sm border-b-2 border-slate-700 shadow-lg sticky top-0 z-50">
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:w-[70%] max-w-screen-xl">
          {/* Top row with title, search, and menu */}
          <div className="flex items-center gap-4 h-16 sm:h-20">
            {/* Left section */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {showBackButton && (
                <button
                  onClick={onBackClick}
                  className="text-slate-200 hover:text-amber-400 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
              <Link to="/" className="flex items-center">
                <h1
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-400 whitespace-nowrap"
                  style={{ fontFamily: "'Lilita One', cursive" }}
                >
                  {title}
                </h1>
              </Link>
            </div>

            {/* Center section - Search Bar */}
            <div className="flex-1 flex justify-end max-w-xs ml-auto">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <svg
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 pointer-events-none"
                    style={{ left: '8px' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search items..."
                    style={{ paddingLeft: '30px' }}
                    className="w-full pr-3 py-1.5 bg-slate-900/50 border-2 border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                  />
                </div>
              </form>
            </div>

            {/* Right section - Menu */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-slate-200 hover:text-amber-400 transition-colors p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-slate-800 rounded-lg shadow-2xl border-2 border-slate-700 z-20 max-h-96 overflow-y-auto">
                    <div className="p-4">
                      <Link
                        to="/"
                        className="block px-4 py-2 text-slate-200 hover:bg-slate-700 rounded"
                        onClick={() => setMenuOpen(false)}
                      >
                        Home
                      </Link>
                    </div>

                    {itemTypes.length > 0 && (
                      <>
                        <div className="border-t border-slate-700" />
                        <div className="p-4">
                          <p className="px-4 py-2 text-slate-500 text-sm font-semibold">
                            Filter by Type
                          </p>
                          {itemTypes.map((itemType) => (
                            <Link
                              key={itemType.type}
                              to={`/filter/${encodeURIComponent(itemType.type)}`}
                              className="flex items-center justify-between px-4 py-2 text-slate-200 hover:bg-slate-700 rounded"
                              onClick={() => setMenuOpen(false)}
                            >
                              <span>{itemType.type}</span>
                              <span className="text-xs bg-amber-400/20 text-amber-400 px-2 py-1 rounded">
                                {itemType.count}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppTopBar;
