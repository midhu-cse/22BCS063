

import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculatorApp = () => {
  const [response, setResponse] = useState(null);

  const handleFetch = async (numberId) => {
    try {
      const res = await axios.get(`http://localhost:9876/numbers/${numberId}`);
      setResponse(res.data);
    } catch (err) {
      setResponse({ error: 'Failed to fetch data' });
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Average Calculator Microservice</h1>
      <div className="space-x-2 mb-4">
        <button onClick={() => handleFetch('p')} className="bg-blue-500 text-white px-4 py-2 rounded">Prime</button>
        <button onClick={() => handleFetch('f')} className="bg-green-500 text-white px-4 py-2 rounded">Fibonacci</button>
        <button onClick={() => handleFetch('e')} className="bg-purple-500 text-white px-4 py-2 rounded">Even</button>
        <button onClick={() => handleFetch('r')} className="bg-yellow-500 text-black px-4 py-2 rounded">Random</button>
      </div>

      {response && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <pre className="text-sm whitespace-pre-wrap">
{JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AverageCalculatorApp;
