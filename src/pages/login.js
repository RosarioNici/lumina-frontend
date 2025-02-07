/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login Response:', response.data);

      // Salva token, tipo utente e nome utente nel localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_type', response.data.user.user_type);
      localStorage.setItem('username', response.data.user.name);

      console.log('Tipo di utente salvato:', response.data.user.user_type);
      console.log('Username salvato:', response.data.user.name);

      navigate('/feed');
    } catch (error) {
      console.error('Errore durante il login:', error.response?.data || error.message);
      setErrorMsg(error.response?.data?.message || 'Errore durante il login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src="/Lumina.png"></img>
        <p>
          Benvenuto nella piattaforma più innovativa per creators. Accedi per
          esplorare contenuti esclusivi e connetterti con la community.
        </p>
      </div>
      <div className="login-right">
        <div className="login-form">
          <h2>Accedi</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Caricamento...' : 'Accedi'}
            </button>
          </form>
          {errorMsg && <p className="error-message">{errorMsg}</p>}
          <p className="login-footer">
            Non hai un account? <a href="/register">Registrati</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
