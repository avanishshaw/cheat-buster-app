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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15">
            <span className="text-xs tracking-wide uppercase text-slate-200">Beta</span>
            <span className="text-xs text-slate-300">Privacy-first search</span>
          </div>
        </div>
        <div className="backdrop-blur-xl bg-white/5 ring-1 ring-white/10 rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Cheat Buster <span role="img" aria-label="broken heart">💔</span>
            </h1>
            <p className="mt-2 text-slate-300">
              Check if a name or email appears on popular dating apps.
            </p>
          </div>

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
        <p className="mt-6 text-center text-xs text-slate-400">
          Results are indicative only. We never store your searches.
        </p>
      </div>
    </div>
  );
}

export default App;