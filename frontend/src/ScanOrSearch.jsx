import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

function ScanOrSearch() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex justify-center items-center px-4 py-12">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">How would you like to get started?</h1>
          <p className="text-gray-600 mb-6">
            You can either scan a barcode, search for a product, or view your favourites.
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/scan')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
            >
              📷 Scan Product
            </button>
            <button
            onClick={() => navigate('/search')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            🔍 Search Product
          </button>
          
          <button
            onClick={() => navigate('/favourites')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            ❤️ Favourites
          </button>

        <button
            onClick={() => navigate('/history')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
            >
            📜 History
        </button>
          
          </div>
        </div>
      </main>
    </div>
  );
}

export default ScanOrSearch;
