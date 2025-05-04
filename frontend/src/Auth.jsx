import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
  
    const data = {
      email,
      password,
    };
  
    const endpoint =
      mode === 'login'
        ? 'http://localhost:8002/auth/login'
        : 'http://localhost:8002/auth/signup';
  
    try {
      const response = await axios.post(endpoint, data);
  
      if (mode === 'login') {
        const token = response.data?.token || response.data?.idToken;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        navigate('/options');
      } else {
        setMode('login');
        window.location.reload();
      }
      
    } catch (err) {
      console.error('Auth failed:', err.response?.data || err.message);
      alert(err.response?.data?.detail || 'Something went wrong');
    }
  };
  

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />

      <main className="flex-grow flex justify-center items-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            {mode === 'login' ? 'Welcome 👋' : 'Create an Account 🚀'}
          </h1>

          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
            >
              {mode === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-green-700 font-semibold underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Auth;
