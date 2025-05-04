import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/auth');
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:8002/search/search_products',
        {
          product_name: query,
          brand: '',
          country: '',
          descriptors: '',
          page: 1,
          page_size: 10
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults(res.data.results);
    } catch (err) {
      alert(err.response?.data?.detail || 'Error searching products');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (item) => {
    try {
      const res = await axios.post(
        'http://localhost:8002/search/evaluate_product',
        item.product,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/results', { state: { evaluation: res.data.evaluation } });
    } catch (err) {
      console.error(err);
      alert('Evaluation failed');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex justify-center items-center px-4 py-12">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-6">Search for a Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="e.g., zero sugar, Canada, Nestlé"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white border border-green-600 text-green-700 font-medium rounded-lg shadow-sm hover:bg-green-100 hover:text-green-800 transition-all"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {results.length > 0 && (
            <ul className="mt-6 space-y-4 text-left">
              {results.map((item, index) => {
                const product = item.product;
                return (
                  <li
                    key={index}
                    onClick={() => handleSelect(item)}
                    className="cursor-pointer bg-gray-100 p-4 rounded-md shadow-sm hover:bg-green-100 transition-all duration-200"
                  >
                    <h2 className="text-lg font-semibold">{product.product_name || 'Unnamed Product'}</h2>
                    <p className="text-sm text-gray-700">Brand: {product.brands || 'N/A'}</p>
                    <p className="text-sm text-gray-700">EcoScore: {product.ecoscore_grade?.toUpperCase() || 'Unknown'}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default Search;
