// src/pages/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import './SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Estrae la query dalla URL
    const searchQuery = new URLSearchParams(location.search).get('query');
    if (searchQuery && searchQuery.length >= 3) {
      setLoading(true);
      api
        .get('/creators/search', { params: { query: searchQuery } })
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error('Errore nella ricerca:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [location.search]); // L'effetto si esegue ogni volta che location.search cambia

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'hashtag') {
      navigate(`/hashtag/${suggestion.value}`);
    } else if (suggestion.type === 'creator') {
      navigate(`/creator/${suggestion.id}`);
    }
  };

  // Per mostrare il termine di ricerca corrente
  const query = new URLSearchParams(location.search).get('query');

  return (
    <div className="search-results-page">
      <header className="search-results-header">
        <h1>Risultati per "{query}"</h1>
      </header>
      {loading ? (
        <p>Caricamento...</p>
      ) : results.length > 0 ? (
        <div className="results-grid">
          {results.map((suggestion) => (
            <div
              key={suggestion.id || suggestion.value}
              className="result-card"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.type === 'hashtag' ? (
                <span className="hashtag">#{suggestion.value}</span>
              ) : (
                <div className="creator-result">
                  <span>{suggestion.value}</span>
                  {suggestion.is_followed ? (
                    <i className="fa fa-user-check" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Nessun risultato trovato.</p>
      )}
    </div>
  );
};

export default SearchResults;
