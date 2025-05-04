import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const evaluation = location.state?.evaluation;

  useEffect(() => {
    if (!evaluation) {
      navigate('/search');
    } else {
      navigate('/score', { state: { evaluation } });
    }
  }, [evaluation, navigate]);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-12 text-center">
        <p className="text-gray-700 text-lg">Redirecting to score... ⏳</p>
      </main>
    </div>
  );
}

export default SearchResults;
