// src/pages/Homepage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';


const Homepage = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const navigate = useNavigate();

  // Popup handlers
  const handleYes = () => {
    setShowPopup(false);
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setShowHome(true);
    }, 3000);
  };

  const handleNo = () => {
    window.location.href = 'https://www.google.com/search?q=gattini';
  };

  // Navbar scroll behavior: scompare quando si scrolla verso il basso e riappare quando si scrolla verso l'alto.
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const handleScroll = () => {
      if (window.pageYOffset > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY = window.pageYOffset;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage">
      {/* Popup per la verifica dell'età */}
      {showPopup && (
        <div className="popup">
          <div className="popup-overlay"></div>
          <div className="popup-content animated-popup">
            <h2>Sei maggiorenne?</h2>
            <p>Questa piattaforma contiene contenuti per adulti. Conferma di avere almeno 18 anni.</p>
            <div className="popup-buttons">
              <button className="popup-btn yes" onClick={handleYes}>Sì, ho 18 anni</button>
              <button className="popup-btn no" onClick={handleNo}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Animazione del logo (full screen) */}
      {showAnimation && (
        <div className="logo-animation">
          <img
            src="/Lumina.png"
            alt="Lumina Logo"
            className="animated-logo"
          />
        </div>
      )}

      {/* Homepage vera e propria */}
      {showHome && (
        <>
          {/* Navbar dinamica */}
          <nav className={`navbar ${showNavbar ? 'visible' : 'hidden'}`}>
            <div className="navbar-logo" onClick={() => navigate('/')}>
              <img src="/Lumina.png" alt="Lumina Logo" />
            </div>
            <div className="navbar-links">
              <button className="navbar-btn" onClick={() => navigate('/login')}>Accedi</button>
              <button className="navbar-btn" onClick={() => navigate('/register')}>Registrati</button>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="hero">
            <div className="hero-content">
              <h1>Benvenuto su Lumina</h1>
              <p>La piattaforma perfetta per creators e fan.</p>
              <button className="hero-btn" onClick={() => navigate('/register')}>Inizia Ora</button>
            </div>
          </section>

          {/* Features Section */}
          <section className="features">
            <h2>Scopri le Nostre Funzionalità</h2>
            <div className="features-grid">
              <div className="feature-item">
                <img src="https://via.placeholder.com/100" alt="Feature 1" />
                <h3>Connessione Globale</h3>
                <p>Raggiungi fan da tutto il mondo con contenuti unici.</p>
              </div>
              <div className="feature-item">
                <img src="https://via.placeholder.com/100" alt="Feature 2" />
                <h3>Contenuti Premium</h3>
                <p>Monetizza la tua creatività con facilità.</p>
              </div>
              <div className="feature-item">
                <img src="https://via.placeholder.com/100" alt="Feature 3" />
                <h3>Eventi Live</h3>
                <p>Interagisci con il tuo pubblico in tempo reale.</p>
              </div>
            </div>
          </section>

          {/* Popular Creators Section */}
          <section className="popular-creators">
            <h2>Creators Più Popolari</h2>
            <div className="creator-grid">
              <div className="creator-card">
                <img src="https://via.placeholder.com/100" alt="Creator 1" />
                <p>Creator 1</p>
              </div>
              <div className="creator-card">
                <img src="https://via.placeholder.com/100" alt="Creator 2" />
                <p>Creator 2</p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="call-to-action">
            <h2>Unisciti a Lumina Oggi</h2>
            <button className="cta-btn" onClick={() => navigate('/register')}>Registrati Ora</button>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-links">
              <a href="/about">Chi Siamo</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Termini</a>
              <a href="/contact">Contatti</a>
            </div>
            <p>© 2025 Lumina. Tutti i diritti riservati.</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Homepage;
