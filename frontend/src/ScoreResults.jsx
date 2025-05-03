import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

function ScoreResults() {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="min-h-screen bg-red-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-12 text-center">
          <h1 className="text-2xl font-semibold text-red-600">No product selected</h1>
        </main>
      </div>
    );
  }

  const sustainabilityScore = 72;
  const ethicalScore = 84;
  const overallScore = Math.round((sustainabilityScore + ethicalScore) / 2);
  const overviewText = `This product is manufactured using moderately sustainable practices. 
    While it avoids major environmental harm, the company has limited transparency around its 
    labour policies and material sourcing. Improvements could be made in packaging and 
    supply chain oversight.`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow px-4 py-12 flex flex-col items-center text-left">
        <h1 className="text-3xl font-bold mb-4">Score Results</h1>
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <div className="mb-6 text-lg">
          <p><strong>Company:</strong> {product.company}</p>
          <p><strong>Country:</strong> {product.country}</p>
          <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
          <p><strong>Sustainability Score:</strong> {sustainabilityScore}/100</p>
          <p><strong>Ethical Score:</strong> {ethicalScore}/100</p>
          <p><strong>Overall Score:</strong> <span className="text-xl font-bold">{overallScore}/100</span></p>
        </div>
        <div className="bg-white p-6 rounded shadow max-w-xl">
          <h3 className="text-lg font-semibold mb-2">Product Overview</h3>
          <p className="text-gray-700 leading-relaxed">{overviewText}</p>
        </div>
      </main>
    </div>
  );
}

export default ScoreResults;