import Navbar from './components/Navbar';
import SearchedItems from './components/SearchedItems';
import { useLocation, useNavigate } from 'react-router-dom';


function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const query = location.state?.query || '';

  

  const products = [
    {
      name: "Organic Almond Milk",
      company: "GreenFarm",
      country: "Canada",
      tags: ["vegan", "organic"],
      image: "https://via.placeholder.com/80?text=Almond+Milk"
    },
    {
      name: "Zero Sugar Cola",
      company: "ColaCo",
      country: "USA",
      tags: ["zero sugar", "carbonated"],
      image: "https://via.placeholder.com/80?text=Cola"
    },
    {
      name: "SalamCola",
      company: "Salam",
      country: "Canada",
      tags: ["zero sugar", "carbonated"],
      image: "https://via.placeholder.com/80?text=Cola"
    },
    {
      name: "Zero Sugar Cola",
      company: "ColaCo",
      country: "USA",
      tags: ["zero sugar", "carbonated"],
      image: "https://via.placeholder.com/80?text=Cola"
    },
    {
      name: "Zero Sugar Cola",
      company: "ColaCo",
      country: "USA",
      tags: ["zero sugar", "carbonated"],
      image: "https://via.placeholder.com/80?text=Cola"
    },
    {
      name: "Zero Sugar Cola",
      company: "ColaCo",
      country: "USA",
      tags: ["zero sugar", "carbonated"],
      image: "https://via.placeholder.com/80?text=Cola"
    }
  ];

  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.company.toLowerCase().includes(query.toLowerCase()) ||
    item.country.toLowerCase().includes(query.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (item) => {
    navigate('/results', { state: { product: item } });
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-12">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Results for "{query}"</h1>
          <SearchedItems items={filtered} onSelect={handleSelect} />
        </div>
      </main>
    </div>
  );
}

export default SearchResults;