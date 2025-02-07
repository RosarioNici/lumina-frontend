import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './UserFeed.css';

const UserFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await api.get('/feed');
        setPosts(response.data);
      } catch (error) {
        console.error('Errore nel recupero del feed:', error);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="user-feed">
      <aside className="user-sidebar">
        <h2>Menu</h2>
        <nav>
          <ul>
            <li><a href="/feed">Feed</a></li>
            <li><a href="/games">Giochi</a></li>
            <li><a href="/live">Live</a></li>
            <li><a href="/profile-settings">Impostazioni Profilo</a></li>
          </ul>
        </nav>
      </aside>
      <main className="feed-main">
        <h1>Il tuo Feed</h1>
        {posts.length === 0 ? (
          <p>Non ci sono post da mostrare.</p>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <div key={post.id} className="post-item">
                <h3>{post.title}</h3>
                {post.is_free ? (
                  <img src={`/storage/${post.file_path}`} alt={post.title} />
                ) : (
                  <div className="post-locked">
                    <p>Contenuto a pagamento</p>
                    <button>Paga per sbloccare</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserFeed;
