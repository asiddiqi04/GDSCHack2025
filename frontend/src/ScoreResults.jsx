import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ScoreResults() {
  const location = useLocation();
  const evaluation = location.state?.evaluation;
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);

  const token = localStorage.getItem('token');
  console.log(token);
  useEffect(() => {
    if (!evaluation || !token) return;

    axios.get('http://localhost:8002/users/favourites', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const alreadyFavourited = res.data.some((fav) =>
        fav.product_name === evaluation.product_name && fav.brand === evaluation.brand
      );
      setIsFavourite(alreadyFavourited);
    })
    .catch((err) => {
      console.error('Failed to check favourites:', err);
    });
  }, [evaluation, token]);

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-red-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-12 text-center">
          <h1 className="text-2xl font-semibold text-red-600">No evaluation data provided</h1>
        </main>
      </div>
    );
  }

  const { product_name, brand, pros, cons, scores, notes, similar_products } = evaluation;

  const handleAddToFavourites = async () => {
    try {
      await axios.post('http://localhost:8002/users/favourites', evaluation, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStatusType('success');
      setStatusMessage('💚 Added to favourites!');
      setIsFavourite(true);
    } catch (err) {
      console.error(err);
      setStatusType('error');
      setStatusMessage('❌ Failed to add product to favourites.');
    }

    setTimeout(() => {
      setStatusMessage('');
      setStatusType('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-10 flex flex-col items-center">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-center mb-4">{product_name}</h1>
          <p className="text-center text-gray-600 mb-6">Brand: {brand || 'N/A'}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-100 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">✅ Pros</h2>
              <ul className="list-disc list-inside text-sm text-gray-800">
                {pros.map((pro, i) => <li key={i}>{pro}</li>)}
              </ul>
            </div>

            <div className="bg-red-100 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">⚠️ Cons</h2>
              <ul className="list-disc list-inside text-sm text-gray-800">
                {cons.map((con, i) => <li key={i}>{con}</li>)}
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">🧠 Notes</h2>
            <ul className="list-disc list-inside text-sm text-gray-800">
              {notes.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
          </div>

          <div className="mt-6 bg-yellow-50 p-4 rounded-lg text-center">
            <h2 className="font-semibold mb-2">📊 Scores</h2>
            <p>Sustainability: <strong>{scores.sustainability}/100</strong></p>
            <p>Ethical: <strong>{scores.ethical}/100</strong></p>
            <p>Combined: <strong className="text-xl">{scores.combined}/100</strong></p>
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">🔁 Similar Products</h2>
            <ul className="list-disc list-inside text-sm text-gray-800">
              {similar_products.map((prod, i) => <li key={i}>{prod}</li>)}
            </ul>
          </div>

          {!isFavourite && (
            <div className="mt-8 text-center">
              <button
                onClick={handleAddToFavourites}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow"
              >
                💚 Add to Favourites
              </button>
              {statusMessage && (
                <p className={`mt-2 text-sm font-medium ${statusType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {statusMessage}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ScoreResults;
