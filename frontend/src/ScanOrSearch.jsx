import { useNavigate } from 'react-router-dom';
import './App.css'; // Reuse existing styling

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

export default ScanOrSearch;
