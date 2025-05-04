import { useState } from 'react';
import Navbar from './components/Navbar';
import SearchedItems from './components/SearchedItems';

const dummyHistory = [
  {
    name: "Zero Sugar Cola",
    company: "ColaCo",
    country: "USA",
    tags: ["zero sugar", "carbonated"],
    image: "https://via.placeholder.com/80?text=Cola"
  },
  {
    name: "Organic Almond Milk",
    company: "GreenFarm",
    country: "Canada",
    tags: ["vegan", "organic"],
    image: "https://via.placeholder.com/80?text=Almond+Milk"
  },
  // Add 8 more for demo if needed
];

function History() {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (item) => {
    const exists = favourites.find((fav) => JSON.stringify(fav) === JSON.stringify(item));
    if (exists) {
      setFavourites((prev) => prev.filter((fav) => JSON.stringify(fav) !== JSON.stringify(item)));
    } else {
      setFavourites((prev) => [...prev, item]);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-12 max-w-xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-center"> History</h1>
        <SearchedItems
          items={dummyHistory}
          mode="history"
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />
      </main>
    </div>
  );
}

export default History;
