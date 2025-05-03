import { Routes, Route, useNavigate } from 'react-router-dom';
import Scan from './Scan';
import Search from './Search';
import SearchResults from './SearchResults';
import ScanOrSearch from './ScanOrSearch';
import ScoreResults from './ScoreResults';
import Auth from './Auth';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-xl font-bold text-green-700">GreenScore 🌱</div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => navigate('/auth')}
        >
          Get Started
        </button>
      </nav>

      <main className="flex-grow flex items-center justify-center px-4 text-center">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Shop Smarter. Live Greener.
          </h1>
          <p className="text-gray-600 mb-6">
            Scan any product to reveal its ethical and environmental footprint.
          </p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow"
            onClick={() => navigate('/auth')}
          >
            Start Scanning
          </button>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/options" element={<ScanOrSearch />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/results" element={<ScoreResults />} />
    </Routes>
  );
}
