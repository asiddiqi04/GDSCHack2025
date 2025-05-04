import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';

function Scan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Camera error:', err);
      }
    };
    getCameraStream();
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
    }
  };

  const handleSubmit = async () => {
    if (!capturedImage) return;

    const token = localStorage.getItem('token');
    const base64Data = capturedImage.replace(/^data:image\/png;base64,/, '');

    setLoading(true);
    setMessage('');

    try {
      const scanRes = await axios.post(
        'http://localhost:8002/search/scan_barcode',
        { image_base64: base64Data },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const scannedProduct = scanRes.data.results[0]?.product;
      if (!scannedProduct) {
        setMessage('❌ No product data found in scan.');
        return;
      }

      const evalRes = await axios.post(
        'http://localhost:8002/search/evaluate_product',
        scannedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate('/results', { state: { evaluation: evalRes.data.evaluation } });

    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.response?.data?.detail || 'Failed to scan or evaluate.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex justify-center items-center px-4 py-12">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-2">Scan a Product</h1>
          <p className="text-gray-600 mb-4">Point your camera at a barcode and capture it.</p>
          <video ref={videoRef} autoPlay playsInline className="w-full rounded-md border border-gray-300 mb-4" />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <button
            onClick={captureImage}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded mb-4"
          >
            📸 Capture
          </button>

          {capturedImage && (
            <>
              <img src={capturedImage} alt="Captured" className="mt-4 rounded-md w-full max-w-xs mx-auto" />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold py-2 rounded mt-4 mb-4 transition`}
              >
                {loading ? '⏳ Submitting...' : '✅ Submit'}
              </button>
              {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Scan;
