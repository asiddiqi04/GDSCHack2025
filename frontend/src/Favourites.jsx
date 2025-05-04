import Navbar from './components/Navbar';
import AIBot from './components/AIBot';

function Favourites() {
  const favouriteItems = [
    { name: 'Zero Sugar Cola', company: 'ColaCo' },
    { name: 'Organic Peanut Butter', company: 'GreenFarm' }
  ];

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center px-4 py-12">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Your Favourites 💚</h1>
          <ul className="space-y-4">
            {favouriteItems.map((item, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">by {item.company}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <AIBot />
    </div>
  );
}

export default Favourites;
