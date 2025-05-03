// src/SearchResults.jsx
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get('q')?.toLowerCase() || '';

  const dummyData = [
    { name: 'Nestlé Water', country: 'Canada', company: 'Nestlé', tags: ['zero sugar'] },
    { name: 'Gluten-Free Cookies', country: 'USA', company: 'Nature’s Best', tags: ['gluten free'] },
    { name: 'Organic Juice', country: 'Canada', company: 'GreenCo', tags: ['sugar free', 'organic'] },
  ];

  const filtered = dummyData.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.country.toLowerCase().includes(query) ||
    item.company.toLowerCase().includes(query) ||
    item.tags.some(tag => tag.toLowerCase().includes(query))
  );

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">GreenScore 🌱</div>
      </nav>

      <main className="hero">
        <h1>Results for "{query}"</h1>
        <div style={{ width: '100%', maxWidth: '600px' }}>
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div key={idx} style={{ margin: '1rem 0', padding: '1rem', background: '#fff', borderRadius: '8px', boxShadow: '0 0 6px rgba(0,0,0,0.1)' }}>
                <h2>{item.name}</h2>
                <p><strong>Company:</strong> {item.company}</p>
                <p><strong>Country:</strong> {item.country}</p>
                <p><strong>Tags:</strong> {item.tags.join(', ')}</p>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default SearchResults;
