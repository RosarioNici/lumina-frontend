import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Feed.css';

const Feed = () => {
  const [userType, setUserType] = useState(null); // "user" o "creator"
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera il tipo di utente salvato nel localStorage
    const storedUserType = localStorage.getItem('user_type');
    console.log('Tipo di utente:', storedUserType);
    setUserType(storedUserType);

    // Recupera i dati del feed
    const fetchFeed = async () => {
      try {
        const response = await api.get('/feed', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPosts(response.data.posts);
        setSuggestions(response.data.suggestions);
      } catch (error) {
        console.error('Errore nel recupero del feed:', error);
      }
    };

    fetchFeed();
  }, []);

  // Funzione per gestire la ricerca tramite pulsante "Cerca"
  const handleSearchButton = () => {
    if (query.trim().length >= 3) {
      // Naviga alla pagina dei risultati di ricerca, passando la query come parametro
      navigate(`/search-results?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="unified-feed">
      {/* Sidebar a destra */}
      <aside className="side-nav">
        <div className="profile-section">
          <img src="/path/to/profile-pic.jpg" alt="Profilo" className="profile-pic" />
          <span className="profile-name">{localStorage.getItem('username') || 'Utente'}</span>
        </div>
        <ul className="nav-links">
          <li><a href="/feed">Home</a></li>
          {userType === 'creator' && <li><a href="/dashboard">Dashboard</a></li>}
          <li><a href="/subscriptions">Abbonamenti</a></li>
          <li><a href="/live">Live</a></li>
        </ul>
        <div className="side-nav-bottom">
          <button className="settings-btn" onClick={() => navigate('/settings')}>
            <i className="fa fa-cog" aria-hidden="true"></i> Impostazioni
          </button>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="feed-main">
        <header className="feed-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Cerca creators o hashtag..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearchButton}>Cerca</button>
          </div>
        </header>

        {/* Sezione dei post */}
        <section className="feed-posts">
          <h2>{userType === 'creator' ? 'I tuoi Post' : 'Post dai creators che segui'}</h2>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                {post.type.startsWith('image/') ? (
                  <img src={`/storage/${post.file_path}`} alt={post.title} />
                ) : (
                  <video controls>
                    <source src={`/storage/${post.file_path}`} type={post.type} />
                  </video>
                )}
                <div className="post-actions">
                  <button className="action-btn like-btn" onClick={() => console.log('Like', post.id)}>Mi Piace</button>
                  <button className="action-btn comment-btn" onClick={() => console.log('Commenta', post.id)}>Commenta</button>
                  <button className="action-btn share-btn" onClick={() => console.log('Condividi', post.id)}>Condividi</button>
                </div>
              </div>
            ))
          ) : (
            <p>Nessun post disponibile.</p>
          )}
        </section>

        {/* Sezione suggerimenti */}
        <section className="feed-suggestions">
          <h2>Suggerimenti di creators</h2>
          {suggestions.map((creator) => (
            <div key={creator.id} className="creator-card">
              <h3>{creator.stage_name}</h3>
              <p>Follower: {creator.followers_count}</p>
              <button onClick={() => navigate(`/creator/${creator.id}`)}>Visita</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Feed;
