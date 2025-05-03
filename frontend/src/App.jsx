// src/App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Scan from './Scan';
// import Search from './Search'

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">GreenScore 🌱</div>
        <button className="nav-button" onClick={() => navigate('/options')}>
          Get Started
        </button>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>Shop Smarter. Live Greener.</h1>
          <p>Scan any product to reveal its ethical and environmental footprint.</p>
          <button className="cta-button" onClick={() => navigate('/options')}>
            Start Scanning
          </button>
        </div>
      </main>
    </div>
  );
}

function ScanOrSearch() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">GreenScore 🌱</div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>How would you like to get started?</h1>
          <p>You can either scan a barcode or search for a product manually.</p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="cta-button" onClick={() => navigate('/scan')}>
              📷 Scan Product
            </button>
            <button className="cta-button" onClick={() => navigate('/search')}>
              🔍 Search Product
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// function Scan() {
//   return (
//     <div className="landing-container">
//       <h1 style={{ padding: '2rem' }}>Scan Page</h1>
//     </div>
//   );
// }

function Search() {
  return (
    <div className="landing-container">
      <h1 style={{ padding: '2rem' }}>Search Page</h1>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/options" element={<ScanOrSearch />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}
