import { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';

function Scan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

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

  const handleSubmit = () => {
    if (capturedImage) {
      localStorage.setItem('scannedImage', capturedImage);
      alert('Image submitted and saved to local storage!');
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
          <button onClick={captureImage} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded mb-4">
            📸 Capture
          </button>
          {capturedImage && (
            <>
              <img src={capturedImage} alt="Captured" className="mt-4 rounded-md w-full max-w-xs mx-auto" />
              <button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded mt-4 mb-4">
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
