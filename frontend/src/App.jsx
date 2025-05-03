// src/App.jsx
import './App.css';

function App() {
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">GreenScore 🌱</div>
        <button className="nav-button">Get Started</button>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>Shop Smarter. Live Greener.</h1>
          <p>Scan any product to reveal its ethical and environmental footprint.</p>
          <button className="cta-button">Start Scanning</button>
        </div>
      </main>
    </div>
  );
}

export default App;
