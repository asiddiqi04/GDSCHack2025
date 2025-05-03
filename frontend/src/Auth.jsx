// src/Auth.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    // In real app: validate credentials or register user
    // For now: just navigate forward
    navigate('/options');
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">GreenScore 🌱</div>
      </nav>

      <main className="hero">
        <h1>{mode === 'login' ? 'Log In' : 'Sign Up'}</h1>
        <form onSubmit={handleAuth} style={{ textAlign: 'center' }}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.8rem', width: '100%', maxWidth: '300px' }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.8rem', width: '100%', maxWidth: '300px' }}
          />
          <br />
          <button className="cta-button" type="submit">
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '1rem' }}>
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            style={{ background: 'none', border: 'none', color: '#2f855a', cursor: 'pointer' }}
          >
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </main>
    </div>
  );
}

export default Auth;
