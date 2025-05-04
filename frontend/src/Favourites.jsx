import { useEffect, useState } from 'react'; 
import axios from 'axios';
import Navbar from './components/Navbar';
import AIBot from './components/AIBot';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Favourites() {
  const [favouriteItems, setFavouriteItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      navigate("/auth");
      return; // Stop further execution
    }
  
    axios.get('http://localhost:8002/users/favourites', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setFavouriteItems(res.data);
    })
    .catch((err) => {
      console.error(err);
      alert("Couldn't load favourites");
    });
  }, [navigate]);
  

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center px-4 py-12">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <HeartIcon className="w-6 h-6 text-green-600" />
            Your Favourites
          </h1>

          {favouriteItems.length === 0 ? (
            <p className="text-center text-gray-500">No favourites added yet.</p>
          ) : (
            <ul className="space-y-4">
              {favouriteItems.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-md shadow-sm border-l-4 border-green-600 cursor-pointer hover:bg-green-50 transition"
                  onClick={() => navigate('/results', { state: { evaluation: item } })}
                >
                  <h2 className="text-lg font-semibold">{item.product_name}</h2>
                  <p className="text-sm text-gray-600">by {item.brand}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <AIBot />
    </div>
  );
}

export default Favourites;
