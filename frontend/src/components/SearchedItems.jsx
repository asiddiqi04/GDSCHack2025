// src/components/SearchedItems.jsx
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

function SearchedItems({ items = [], onSelect, mode = 'default', favourites = [], toggleFavourite }) {
  if (items.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-12">
        <h2 className="text-2xl font-semibold mb-2">No matching results</h2>
        <p>Try searching for something else.</p>
      </div>
    );
  }

  const isFavourited = (item) =>
    favourites?.some((fav) => JSON.stringify(fav) === JSON.stringify(item));

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      {items.map((item, idx) => (
        <div
        key={idx}
        onClick={() => mode === 'default' && onSelect?.(item)}
        className="flex items-center p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-600 cursor-pointer transform transition-all hover:scale-[1.015] hover:shadow-md"
      >
        <img
          src={item.image || 'https://via.placeholder.com/80'}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md mr-4"
        />
        <div className="flex-grow text-left">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-600 leading-snug">
            <strong>Company:</strong> {item.company}<br />
            <strong>Country:</strong> {item.country}<br />
            <strong>Tags:</strong> {item.tags?.join(', ') || 'None'}
          </p>
        </div>
      
        {mode === 'default' ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(item);
            }}
            className="ml-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            Select
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavourite?.(item);
            }}
            className="w-6 h-6 text-red-600 hover:scale-110 transition-transform ml-4"
          >
            {isFavourited(item) ? (
              <HeartSolid className="w-6 h-6" />
            ) : (
              <HeartOutline className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
      
      ))}
    </div>
  );
}

export default SearchedItems;
