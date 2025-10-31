import React from 'react';

const Results = ({ result, loading, error }) => {
  if (loading) {
    return (
      <div className="mt-6">
        <div className="h-24 rounded-xl bg-white/10 animate-pulse" />
      </div>
    );
  }

  if (error) {
    const isSafeMessage = error.includes('Phew!');
    return (
      <div className={`mt-6 rounded-xl p-4 ring-1 ${isSafeMessage ? 'bg-emerald-500/10 ring-emerald-500/30 text-emerald-200' : 'bg-rose-500/10 ring-rose-500/30 text-rose-200'}`}>
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl p-5 bg-white/80 text-slate-900 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={result.picture}
          alt="User"
          className="w-16 h-16 rounded-full object-cover ring-2 ring-rose-500/30"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-md bg-rose-100 text-rose-700 ring-1 ring-rose-200">Busted</span>
            <h3 className="text-lg font-semibold">
              {result.firstName} {result.lastName}
              <span className="text-slate-500"> · {result.age}</span>
            </h3>
          </div>
          <p className="text-slate-600">Appears on dating platforms. Location: {result.city}.</p>
        </div>
      </div>
    </div>
  );
};

export default Results;