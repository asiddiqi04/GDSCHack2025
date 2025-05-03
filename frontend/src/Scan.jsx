// import { useState } from 'react';
// import './App.css';

// function Scan() {
//   const [image, setImage] = useState(null);
//   const [previewURL, setPreviewURL] = useState(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreviewURL(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = () => {
//     if (!image) return alert('Please upload an image first.');
//     // Send `image` to your backend here using FormData
//     console.log('Submitting image:', image);
//   };

//   return (
//     <div className="landing-container">
//       <nav className="navbar">
//         <div className="logo">GreenScore 🌱</div>
//       </nav>

//       <main className="hero">
//         <div className="hero-content">
//           <h1>Upload Barcode Image</h1>
//           <p>Select or take a photo of a product's barcode to begin.</p>

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={{ marginBottom: '1rem' }}
//           />

//           {previewURL && (
//             <img
//               src={previewURL}
//               alt="Uploaded preview"
//               style={{
//                 maxWidth: '300px',
//                 marginBottom: '1rem',
//                 borderRadius: '8px',
//                 boxShadow: '0 0 8px rgba(0,0,0,0.1)'
//               }}
//             />
//           )}

//           <button className="cta-button" onClick={handleSubmit}>
//             Submit
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Scan;


import { useEffect, useRef, useState } from 'react';
import './App.css';

function Scan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const getCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: isMobile
            ? { facingMode: { exact: 'environment' } }
            : true, // default webcam on desktop
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Camera access error:', err);
        alert('Could not access the camera.');
      }
    };

    getCamera();

    return () => {
      // Stop camera when leaving the page
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    setCapturedImage(dataURL);
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">GreenScore 🌱</div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>Scan a Product</h1>
          <p>Point your camera at a barcode and capture it.</p>

          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '100%', maxWidth: '400px', borderRadius: '10px', marginBottom: '1rem' }}
          />

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          <button className="cta-button" onClick={captureImage}>
            📸 Capture
          </button>

          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              style={{ marginTop: '1rem', maxWidth: '300px', borderRadius: '8px' }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Scan;
