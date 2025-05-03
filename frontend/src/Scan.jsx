import { useState } from 'react';
import './App.css';

function Scan() {
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!image) return alert('Please upload an image first.');
    // Send `image` to your backend here using FormData
    console.log('Submitting image:', image);
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">GreenScore 🌱</div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>Upload Barcode Image</h1>
          <p>Select or take a photo of a product's barcode to begin.</p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginBottom: '1rem' }}
          />

          {previewURL && (
            <img
              src={previewURL}
              alt="Uploaded preview"
              style={{
                maxWidth: '300px',
                marginBottom: '1rem',
                borderRadius: '8px',
                boxShadow: '0 0 8px rgba(0,0,0,0.1)'
              }}
            />
          )}

          <button className="cta-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}

export default Scan;
