import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Live.css';

const Live = () => {
  const [liveEvents, setLiveEvents] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch degli eventi live dal backend
  useEffect(() => {
    const fetchLiveEvents = async () => {
      try {
        const response = await api.get('/events', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setLiveEvents(response.data);
      } catch (error) {
        console.error("Errore nel recupero degli eventi live:", error);
      }
    };
    fetchLiveEvents();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleMenuItemClick = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="live-page">
      <header className="live-header">
        <div className="hamburger-menu">
          <button className="hamburger-btn" onClick={toggleMenu}>
            <span className="hamburger-icon">&#9776;</span>
          </button>
          {menuOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleMenuItemClick('/feed')}>Home</li>
              <li onClick={() => handleMenuItemClick('/live')}>Live</li>
              <li onClick={() => handleMenuItemClick('/subscriptions')}>Abbonamenti</li>
              <li onClick={() => handleMenuItemClick('/settings')}>Impostazioni</li>
              <li onClick={() => {
                localStorage.clear();
                handleMenuItemClick('/login');
              }}>Logout</li>
            </ul>
          )}
        </div>
        <h1 className="page-title">Live Events</h1>
      </header>

      <main className="live-main">
        <div className="live-cards">
          {liveEvents.length > 0 ? (
            liveEvents.map((event) => (
              <div key={event.id} className="live-card" onClick={() => navigate(`/live/${event.id}`)}>
                <img src={`/storage/${event.thumbnail}`} alt={event.title} className="live-thumbnail" />
                <div className="live-card-info">
                  <h3>{event.title}</h3>
                  <p>Inizia alle {new Date(event.start_time).toLocaleTimeString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-live">Nessun evento live attivo al momento.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Live;
