// src/Search.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';


function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search-results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="landing-container">
    <Navbar />


      <main className="hero">
        <h1>Search for a Product</h1>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <input
            type="text"
            placeholder="e.g., zero sugar, Canada, Nestlé"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: '1rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              width: '100%',
              maxWidth: '400px',
              marginBottom: '1rem',
            }}
          />
          <br />
          <button className="cta-button" type="submit">
            Search
          </button>
        </form>
      </main>
    </div>
  );
}

export default Search;
