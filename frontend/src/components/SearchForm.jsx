// src/components/SearchForm.jsx
import React from 'react';

// Receive the props from App.jsx
const SearchForm = ({ searchTerm, setSearchTerm, onSearch, loading }) => {
  return (
    <form onSubmit={onSearch} className="flex gap-2 mt-6">
      <input
        type="text"
        placeholder="Enter email or first name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
        disabled={loading} // Disable input while loading
        required
      />
      <button
        type="submit"
        className="p-3 px-6 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300"
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchForm;