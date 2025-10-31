import React from 'react';

const SearchForm = ({ searchTerm, setSearchTerm, onSearch, loading }) => {
  return (
    <form onSubmit={onSearch} className="mt-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Enter email or first name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/80 text-slate-900 placeholder-slate-500 shadow-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500/70 disabled:opacity-70"
            disabled={loading}
            required
            aria-label="Search by email or first name"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.243 11.93l4.289 4.288a.75.75 0 1 0 1.06-1.06l-4.288-4.29A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
        <button
          type="submit"
          className="h-12 px-5 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white font-medium shadow-sm hover:shadow-md hover:brightness-105 active:brightness-95 transition disabled:opacity-60 disabled:hover:shadow-none"
          disabled={loading}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
              </svg>
              Searching
            </span>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;