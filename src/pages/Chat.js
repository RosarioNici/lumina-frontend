// src/pages/Chat.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Chat.css';

const Chat = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatSessions = async () => {
      try {
        const response = await api.get('/chat/sessions', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSessions(response.data);
      } catch (error) {
        console.error('Errore nel recupero delle chat:', error);
      }
    };
    fetchChatSessions();
  }, []);

  return (
    <div className="chat-page">
      <h1>Chat Attive</h1>
      {sessions.length > 0 ? (
        <ul className="chat-session-list">
          {sessions.map((session) => (
            <li key={session.id} onClick={() => navigate(`/chat/sessions/${session.id}`)}>
              Chat con: {session.participants.join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nessuna chat attiva.</p>
      )}
    </div>
  );
};

export default Chat;
