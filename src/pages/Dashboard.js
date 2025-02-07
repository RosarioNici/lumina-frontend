import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import api from '../services/api';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState('');
  const [creatorName, setCreatorName] = useState(''); // Stato per il nome del creator

  useEffect(() => {
    const fetchCreatorDetails = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('Token non trovato.');

          const response = await api.get('/creator/details', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCreatorName(response.data.stage_name || 'Creator');
        } catch (error) {
          console.error('Errore nel recupero dei dettagli del creator:', error.response?.data || error.message);
        }
      };


    fetchCreatorDetails();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('creator_id', 1); // Sostituisci con un ID valido
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('is_free', isFree);
    if (!isFree) formData.append('price', price);

    try {
      const response = await api.post('/creator/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
      setTitle('');
      setDescription('');
      setFile(null);
      setIsFree(true);
      setPrice('');
    } catch (error) {
      console.error('Errore durante il caricamento del contenuto:', error.response?.data || error.message);
      setMessage('Errore durante il caricamento.');
    }
  };

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h2>Lumina</h2>
        <nav>
          <ul>
            <li><a href="/content">I miei contenuti</a></li>
            <li><a href="/statistics">Statistiche</a></li>
            <li><a href="/settings">Impostazioni</a></li>
            <li><a href="/creator-feed">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/subscriptions">Gestione Abbonamenti</a></li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Benvenuto {creatorName}</h1>
          <p>Qui puoi gestire i tuoi contenuti e controllare le statistiche.</p>
        </header>
        <section className="dashboard-stats">
          <div className="stat-card">
            <h3>Visualizzazioni</h3>
            <p>12,345</p>
          </div>
          <div className="stat-card">
            <h3>Follower</h3>
            <p>1,234</p>
          </div>
          <div className="stat-card">
            <h3>Guadagni</h3>
            <p>€ 1,234.56</p>
          </div>
        </section>

        {/* Nuova Sezione per il Caricamento dei Contenuti */}
        <section className="dashboard-upload">
          <h2>Carica Nuovo Contenuto</h2>
          <form onSubmit={handleUpload}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
            <input
              type="text"
              placeholder="Titolo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Descrizione"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            {/* Opzioni per Gratis o a Pagamento */}
            <label>
              <input
                type="radio"
                value={true}
                checked={isFree === true}
                onChange={() => setIsFree(true)}
              />
              Gratis
            </label>
            <label>
              <input
                type="radio"
                value={false}
                checked={isFree === false}
                onChange={() => setIsFree(false)}
              />
              A pagamento
            </label>
            {!isFree && (
              <input
                type="number"
                placeholder="Prezzo (€)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            )}

            <button type="submit">Carica</button>
          </form>
          {message && <p>{message}</p>}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
