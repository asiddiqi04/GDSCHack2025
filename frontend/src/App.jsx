// src/App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Scan from './Scan';
import Search from './Search';
import SearchResults from './SearchResults';
import ScanOrSearch from './ScanOrSearch';
import ScoreResults from './ScoreResults';
import Auth from './Auth';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">GreenScore 🌱</div>
        <button className="nav-button" onClick={() => navigate('/auth')}>
          Get Started
        </button>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>Shop Smarter. Live Greener.</h1>
          <p>Scan any product to reveal its ethical and environmental footprint.</p>
          <button className="cta-button" onClick={() => navigate('/auth')}>
            Start Scanning
          </button>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/options" element={<ScanOrSearch />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/results" element={<ScoreResults />} />
    </Routes>
  );
}
