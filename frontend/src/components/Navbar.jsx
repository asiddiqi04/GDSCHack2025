// src/components/Navbar.jsx
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div
        className="text-xl font-bold text-green-700 cursor-pointer"
        onClick={() => navigate('/options')}
      >
        GreenScore ♻️
      </div>
    </nav>
  );
}

export default Navbar;