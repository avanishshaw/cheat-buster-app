import React from 'react';

const Results = ({ result, loading, error }) => {
  if (loading) {
    return <p className="mt-8 text-gray-500">Searching...</p>;
  }

  if (error) {
    const isSafeMessage = error.includes('Phew!');
    return (
      <p className={`mt-8 font-bold ${isSafeMessage ? 'text-green-600' : 'text-red-600'}`}>
        {error}
      </p>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="mt-8 border-2 border-red-600 p-4 rounded-lg flex flex-col items-center animate-pulse-once">
      <img
        src={result.picture}
        alt="User"
        className="w-24 h-24 rounded-full object-cover mb-4"
        referrerPolicy="no-referrer"
      />
      <h3 className="text-xl font-bold text-red-600 mb-2">BUSTED!</h3>
      <p className="text-gray-700">
        <strong className="text-gray-900">
          {result.firstName} {result.lastName}
        </strong>{' '}
        ({result.age}) was found.
      </p>
      <p className="text-gray-700">They live in {result.city}.</p>
    </div>
  );
};

export default Results;