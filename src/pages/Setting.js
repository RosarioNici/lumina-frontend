import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Setting.css';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    profile_picture: ''
  });
  const [previewPic, setPreviewPic] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Carica i dati del profilo al montaggio del componente
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/creator/details', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProfile(response.data);
        setPreviewPic(response.data.profile_picture); // Assumi che il campo contenga il percorso dell'immagine
      } catch (error) {
        console.error('Errore nel recupero del profilo:', error);
      }
    };

    fetchProfile();
  }, []);

  // Gestione del cambiamento degli input di testo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Gestione del cambio della foto profilo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, profile_picture: file }));
      // Crea un'anteprima della foto
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Invio del form per aggiornare il profilo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('bio', profile.bio);
      if (profile.profile_picture instanceof File) {
        formData.append('profile_picture', profile.profile_picture);
      }
      const response = await api.put('/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del profilo:', error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.errors) {
        // Puoi estrarre e visualizzare i dettagli di validazione
        setErrorMessage(JSON.stringify(error.response.data.errors));
      } else {
        setErrorMessage(error.response?.data?.message || 'Errore durante l\'aggiornamento.');
      }
      setMessage('');
    }
  };


  return (
    <div className="settings-page">
      <h1>Impostazioni Profilo</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={profile.name || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={profile.bio || ''}
            onChange={handleChange}
            placeholder="Scrivi la tua bio..."
          ></textarea>
        </label>
        <label>
          Foto Profilo:
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        {previewPic && (
          <div className="profile-pic-preview">
            <img src={previewPic} alt="Anteprima Profilo" />
          </div>
        )}
        <button type="submit">Aggiorna Profilo</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Settings;
