
function ScoreResults() {
  // Placeholder data
  const sustainabilityScore = 72;
  const ethicalScore = 84;
  const overallScore = Math.round((sustainabilityScore + ethicalScore) / 2);
  const overviewText = `This product is manufactured using moderately sustainable practices. 
  While it avoids major environmental harm, the company has limited transparency around its 
  labour policies and material sourcing. Improvements could be made in packaging and 
  supply chain oversight.`;

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">GreenScore 🌱</div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>Score Results</h1>

          <div style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            <p><strong>Sustainability Score:</strong> {sustainabilityScore}/100</p>
            <p><strong>Ethical Concerns Score:</strong> {ethicalScore}/100</p>
            <p><strong>Overall Score:</strong> <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{overallScore}/100</span></p>
          </div>

          <div style={{ maxWidth: '600px', textAlign: 'left', background: '#ffffff', padding: '1rem 1.5rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0 }}>Product Overview</h3>
            <p style={{ lineHeight: '1.6', color: '#4a5568' }}>{overviewText}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ScoreResults;