import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';

function History() {
  const [recentProducts, setRecentProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios
      .get('http://localhost:8002/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecentProducts(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch history:', err);
      });
  }, [token]);

  const handleSelect = (product) => {
    navigate('/results', { state: { evaluation: product } });
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-12 max-w-xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Recent Products 🕒</h1>
        {recentProducts.length === 0 ? (
          <p className="text-center text-gray-600">No recent evaluations found.</p>
        ) : (
          <ul className="space-y-4">
            {recentProducts.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="cursor-pointer bg-white hover:bg-green-100 p-4 rounded-md shadow transition duration-200"
              >
                <h2 className="text-lg font-semibold">{item.product_name || 'Unnamed Product'}</h2>
                <p className="text-sm text-gray-700">Brand: {item.brand || 'N/A'}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default History;
