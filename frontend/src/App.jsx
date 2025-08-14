import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import { searchUserByTerm } from './api/userAPI';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault(); 
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await searchUserByTerm(searchTerm);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 flex justify-center items-center min-h-screen font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800">
          Cheat Buster <span role="img" aria-label="broken heart">💔</span>
        </h1>
        <p className="mt-2 text-gray-600">
          Find out if your partner is on other "dating" apps.
        </p>

        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          loading={loading}
        />
        <Results
          result={result}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;