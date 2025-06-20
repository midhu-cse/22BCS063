import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);

  const calculate = async (operation) => {
    try {
      const response = await axios.post(`http://localhost:5000/${operation}`, {
        a: parseFloat(a),
        b: parseFloat(b),
      });
      setResult(response.data.result);
    } catch (error) {
      setResult(error.response?.data?.error || 'Error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f0f0'
    }}>
      <div style={{
        background: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px' }}>🧮Calculator</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <input
            type="number"
            value={a}
            placeholder="Enter A"
            onChange={(e) => setA(e.target.value)}
            style={{ padding: '8px', width: '100px' }}
          />
          <input
            type="number"
            value={b}
            placeholder="Enter B"
            onChange={(e) => setB(e.target.value)}
            style={{ padding: '8px', width: '100px' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => calculate('add')} style={btnStyle}>+</button>
          <button onClick={() => calculate('subtract')} style={btnStyle}>−</button>
          <button onClick={() => calculate('multiply')} style={btnStyle}>×</button>
          <button onClick={() => calculate('divide')} style={btnStyle}>÷</button>
        </div>
        <h3 style={{ marginTop: '20px' }}>Result: <span style={{ color: '#333' }}>{result !== null ? result : '--'}</span></h3>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '10px 15px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '6px',
  background: '#007bff',
  color: '#fff',
  cursor: 'pointer'
};

export default App;
