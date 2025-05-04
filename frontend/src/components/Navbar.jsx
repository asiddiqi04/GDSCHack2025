// // src/components/Navbar.jsx
// import { useNavigate } from 'react-router-dom';

// function Navbar() {
//   const navigate = useNavigate();

//   return (
//     <nav className="flex justify-between items-center p-4 bg-white shadow-md">
//       <div
//         className="text-xl font-bold text-green-700 cursor-pointer"
//         onClick={() => navigate('/options')}
//       >
//         GreenScore ♻️
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import { useLocation, useNavigate } from 'react-router-dom';

function Navbar({ showButton, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const hideLogout = location.pathname === '/' || location.pathname === '/auth';

  return (
    <nav className="flex justify-between items-center px-8 py-6 bg-white shadow h-20">
      {/* Logo */}
      <div
        className="text-3xl font-bold text-green-700 cursor-pointer"
        onClick={() => navigate('/options')}
      >
        GreenScore 🌱
      </div>

      {/* Centered Links */}
      {/* <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8 text-lg font-medium text-gray-700">
        <button onClick={() => navigate('/options')} className="hover:text-green-700">Home</button>
        <button onClick={() => navigate('/favourites')} className="hover:text-green-700">Favourites</button>
        <button onClick={() => navigate('/history')} className="hover:text-green-700">History</button>
      </div> */}

        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-lg font-medium text-gray-700">
            <button onClick={() => navigate('/options')} className="hover:text-green-700">Home</button>
            <button onClick={() => navigate('/scan')} className="hover:text-green-700">Scan</button>
            <button onClick={() => navigate('/search')} className="hover:text-green-700">Search</button>
            <button onClick={() => navigate('/favourites')} className="hover:text-green-700">Favourites</button>
            <button onClick={() => navigate('/history')} className="hover:text-green-700">History</button>
        </div>


      {/* Logout button (hidden on App and Auth) */}
      {!hideLogout && (
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => {
            localStorage.removeItem('token'); // remove token
            navigate('/auth'); // redirect to auth
          }}
        >
          Log Out
      </button>

      )}

      {/* Optional custom button */}
      {showButton && (
        <button
          onClick={onClick}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Get Started
        </button>
      )}
    </nav>
  );
}

export default Navbar;
