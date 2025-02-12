// Esempio di Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Funzione per gestire la navigazione controllando se l'utente è autenticato
  const handleNavigation = (path) => {
    if (token) {
      navigate(path);
    } else {
      // Se non è loggato, reindirizza alla pagina di login
      navigate('/login');
    }
  };

  const userType = localStorage.getItem('user_type');

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => handleNavigation('/')}>
        <img src="/Lumina.png" alt="Lumina Logo" />
      </div>
      <div className="navbar-links">
        <button onClick={() => handleNavigation('/feed')}>Home</button>
        {userType === 'creator' && (
          <button onClick={() => handleNavigation('/dashboard')}>Dashboard</button>
        )}
        <button onClick={() => handleNavigation('/subscriptions')}>Abbonamenti</button>
        <button onClick={() => handleNavigation('/live')}>Live</button>
        <button onClick={() => handleNavigation('/settings')}>Impostazioni</button>
        <button
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
