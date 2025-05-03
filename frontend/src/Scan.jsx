import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';


function Scan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const getCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: isMobile
            ? { facingMode: { exact: 'environment' } }
            : true,
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

  const handleSubmit = () => {
    if (!capturedImage) {
      alert('Please capture an image first.');
      return;
    }

    // Future: Upload capturedImage (dataURL) to backend
    navigate('/results');
  };

  return (
    <div className="landing-container">
    <Navbar />


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
            <>
              <img
                src={capturedImage}
                alt="Captured"
                style={{ marginTop: '1rem', maxWidth: '300px', borderRadius: '8px' }}
              />
              <button
                className="cta-button"
                style={{ marginTop: '1rem' }}
                onClick={handleSubmit}
              >
                ✅ Submit
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Scan;