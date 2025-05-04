import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import {
  CameraIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ClockIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';

function ScanOrSearch() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // redirect to home if token doesn't exist
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex justify-center items-center px-4 py-12">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">How would you like to get started?</h1>
          <p className="text-gray-600 mb-6">
            You can either scan a barcode, search for a product, or view your favourites.
          </p>

          <div className="space-y-4">
            {[
              { label: 'Scan Product', icon: CameraIcon, path: '/scan' },
              { label: 'Search Product', icon: MagnifyingGlassIcon, path: '/search' },
              { label: 'Favourites', icon: HeartIcon, path: '/favourites' },
              { label: 'History', icon: ClockIcon, path: '/history' },
            ].map(({ label, icon: Icon, path }, i) => (
              <button
                key={i}
                onClick={() => navigate(path)}
                className="w-full flex items-center justify-between px-5 py-3 bg-white border border-green-600 text-green-700 font-medium rounded-lg shadow-sm hover:shadow-md hover:bg-green-50 transition-all"
              >
                <span className="flex items-center gap-2 text-lg">
                  <Icon className="w-5 h-5" />
                  {label}
                </span>
                <ChevronRightIcon className="w-5 h-5 text-green-600" />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ScanOrSearch;
