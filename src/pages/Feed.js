// src/pages/Feed.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/Layout';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    // Applica il tema
    document.body.classList.toggle('dark-mode', darkMode);

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
  }, [darkMode]);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length >= 3) {
      try {
        const response = await api.get('/creators/search', { params: { query: searchQuery } });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Errore nella ricerca dei creators o hashtag:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'hashtag') {
      navigate(`/hashtag/${suggestion.value}`);
    } else if (suggestion.type === 'creator') {
      navigate(`/creator/${suggestion.id}`);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', newMode);
  };

  return (
    <Layout>
      <header className="feed-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Cerca creators o hashtag..."
            value={query}
            onChange={handleSearch}
          />
          <button className="search-btn" onClick={() => navigate(`/search-results?query=${encodeURIComponent(query)}`)}>
            Cerca
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="search-dropdown">
            {searchResults.map((suggestion) => (
              <div
                key={suggestion.id || suggestion.value}
                className="search-suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.type === 'hashtag' ? `#${suggestion.value}` : suggestion.value}
              </div>
            ))}
          </div>
        )}
        <button className="darkmode-btn" onClick={toggleDarkMode}>
          {darkMode ? 'Tema Chiaro' : 'Tema Scuro'}
        </button>
      </header>
      <section className="feed-posts">
        <h2>Post dai creators che segui</h2>
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
                <button className="action-btn like-btn" onClick={() => console.log('Mi Piace', post.id)}>Mi Piace</button>
                <button className="action-btn comment-btn" onClick={() => console.log('Commenta', post.id)}>Commenta</button>
                <button className="action-btn share-btn" onClick={() => console.log('Condividi', post.id)}>Condividi</button>
              </div>
            </div>
          ))
        ) : (
          <p>Nessun post disponibile.</p>
        )}
      </section>
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
    </Layout>
  );
};

export default Feed;
