import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PopularCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await api.get('/creators/popular');
        setCreators(response.data);
      } catch (error) {
        console.error('Errore nel recupero dei creators più popolari:', error);
      }
    };

    fetchCreators();
  }, []);

  return (
    <section className="popular-creators">
      <h2>Creators più seguiti</h2>
      <div className="creator-grid">
        {creators.length > 0 ? (
          creators.map((creator) => (
            <div key={creator.id} className="creator-card">
              <img src={creator.profile_picture || 'https://via.placeholder.com/150'} alt={creator.stage_name} />
              <p>{creator.stage_name}</p>
              <p>Follower: {creator.followers_count}</p>
            </div>
          ))
        ) : (
          <p>Non ci sono creators da mostrare.</p>
        )}
      </div>
    </section>
  );
};

export default PopularCreators;
