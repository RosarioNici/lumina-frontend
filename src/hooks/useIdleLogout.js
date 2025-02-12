// src/hooks/useIdleLogout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useIdleLogout = (timeout = 300000) => { // 300000ms = 5 minuti
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Azione da eseguire in caso di inattività (logout)
        localStorage.removeItem('token');
        localStorage.removeItem('user_type');
        localStorage.removeItem('username');
        navigate('/login');
      }, timeout);
    };

    // Aggiungi gli event listeners per "attività" dell'utente
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    // Avvia il timer
    resetTimer();

    // Pulizia degli event listeners al cleanup
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      clearTimeout(timer);
    };
  }, [navigate, timeout]);
};

export default useIdleLogout;
