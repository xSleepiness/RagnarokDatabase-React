const ErrorCard = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-red-500/30">
        <div className="text-center">
          <h3
            className="text-2xl font-bold text-red-400 mb-2"
            style={{ fontFamily: "'Lilita One', cursive" }}
          >
            Error
          </h3>
          <p className="text-slate-300 mb-4">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-amber-400 text-slate-950 rounded-lg font-semibold hover:bg-amber-500 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;
