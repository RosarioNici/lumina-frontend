import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import './CreatorProfile.css';

const CreatorProfile = () => {
  const { creatorId } = useParams();
  const [creator, setCreator] = useState(null);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const creatorResponse = await api.get(`/creators/${creatorId}`);
        setCreator(creatorResponse.data);

        const contentResponse = await api.get(`/creators/${creatorId}/content`);
        setContents(contentResponse.data);
      } catch (error) {
        console.error('Errore nel recupero dei dati del creator:', error);
      }
    };

    fetchCreatorData();
  }, [creatorId]);

  return (
    <div className="creator-profile">
      {creator ? (
        <>
          <div className="profile-header">
            <img src={`/storage/${creator.profile_picture}`} alt={creator.stage_name} />
            <h1>{creator.stage_name}</h1>
            <p>{creator.bio}</p>
          </div>
          <div className="profile-contents">
            <h2>Contenuti</h2>
            {contents.length === 0 ? (
              <p>Non ci sono contenuti da mostrare.</p>
            ) : (
              <div className="content-grid">
                {contents.map((content) => (
                  <div key={content.id} className="content-item">
                    <h3>{content.title}</h3>
                    {content.is_free ? (
                      <img src={`/storage/${content.file_path}`} alt={content.title} />
                    ) : (
                      <div className="content-locked">
                        <p>Contenuto a pagamento: €{content.price}</p>
                        <button>Paga per vedere</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default CreatorProfile;
