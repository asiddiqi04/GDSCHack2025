<<<<<<< HEAD
// src/components/SearchedItems.jsx
function SearchedItems({ items = [], onSelect }) {
    if (items.length === 0) {
      return (
        <div className="text-center text-gray-600 mt-12">
          <h2 className="text-2xl font-semibold mb-2">No matching results</h2>
          <p>Try searching for something else.</p>
        </div>
      );
    }


  
    return (
      <div className="space-y-4 w-full max-w-2xl mx-auto">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(item)}
            className="flex items-center p-4 bg-white rounded-lg shadow-sm cursor-pointer transform transition-all hover:scale-[1.015] hover:shadow-md"
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              className="ml-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    );
  }
  
  export default SearchedItems;
=======
// src/components/SearchedItems.jsx
function SearchedItems({ items = [], onSelect }) {
    if (items.length === 0) {
      return (
        <div className="text-center text-gray-600 mt-12">
          <h2 className="text-2xl font-semibold mb-2">No matching results</h2>
          <p>Try searching for something else.</p>
        </div>
      );
    }


  
    return (
      <div className="space-y-4 w-full max-w-2xl mx-auto">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(item)}
            className="flex items-center p-4 bg-white rounded-lg shadow-sm cursor-pointer transform transition-all hover:scale-[1.015] hover:shadow-md"
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              className="ml-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    );
  }
  
  export default SearchedItems;
>>>>>>> 843eb761840d75f28e8fdc46e9fd8744340302f8
  