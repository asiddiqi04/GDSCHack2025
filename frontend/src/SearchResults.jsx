import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

function SearchResults() {
  const location = useLocation();
  const query = location.state?.query || '';

  const products = [
    { name: "Organic Almond Milk", company: "GreenFarm", country: "Canada", tags: ["vegan", "organic"] },
    { name: "Zero Sugar Cola", company: "ColaCo", country: "USA", tags: ["zero sugar", "carbonated"] }
  ];

  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.company.toLowerCase().includes(query.toLowerCase()) ||
    item.country.toLowerCase().includes(query.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex justify-center items-start px-4 py-12">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Results for "{query}"</h1>
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-700"><strong>Company:</strong> {item.company}</p>
                <p className="text-gray-700"><strong>Country:</strong> {item.country}</p>
                <p className="text-gray-700"><strong>Tags:</strong> {item.tags.join(', ')}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No results found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default SearchResults;
