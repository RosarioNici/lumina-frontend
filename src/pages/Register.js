import React, { useState } from 'react';
import api from '../services/api';
import './Register.css';

const Register = () => {
  const [userType, setUserType] = useState('normal');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    birth_date: '',
    country: '',
    city: '',
    address: '',
    stage_name: '',
    bio: '',
    profile_picture: '',
    social_links: {
      instagram: '',
      twitter: '',
    },
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isOfAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    return age > 18 || (age === 18 && monthDiff >= 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_links.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        social_links: { ...prev.social_links, [key]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOfAge(formData.birth_date)) {
      setErrorMessage('Devi essere maggiorenne per registrarti.');
      return;
    }

    try {
      const response = await api.post('/register', { ...formData, user_type: userType });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        birth_date: '',
        country: '',
        city: '',
        address: '',
        stage_name: '',
        bio: '',
        profile_picture: '',
        social_links: {
          instagram: '',
          twitter: '',
        },
      });
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.response?.data?.message || 'Errore durante la registrazione.');
    }
  };

  return (
    <div className="register-page">
      {/* Video Section */}
      <div className="register-left">
        <video autoPlay loop muted>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Il tuo browser non supporta il video.
        </video>
      </div>

      {/* Form Section */}
      <div className="register-right">
        <div className="register-form">
          {successMessage ? (
            <div className="success-message">
              <h2>Registrazione Completata!</h2>
              <p>{successMessage}</p>
            </div>
          ) : (
            <>
              <h2>Registrati</h2>
              <form onSubmit={handleSubmit}>
              <div className="user-type-selection-modern">
  <div
    className={`user-type-card ${userType === 'normal' ? 'selected' : ''}`}
    onClick={() => setUserType('normal')}
  >
    <h3>User</h3>
    <p>Accedi a contenuti esclusivi e scopri il meglio della piattaforma.</p>
  </div>
  <div
    className={`user-type-card ${userType === 'creator' ? 'selected' : ''}`}
    onClick={() => setUserType('creator')}
  >
    <h3>Creator</h3>
    <p>Diventa un creatore di contenuti e guadagna con i tuoi fan.</p>
  </div>
</div>

                <input type="text" name="name" placeholder="Nome Completo" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="password" name="password_confirmation" placeholder="Conferma Password" value={formData.password_confirmation} onChange={handleChange} required />
                <input type="date" name="birth_date" placeholder="Data di Nascita" value={formData.birth_date} onChange={handleChange} required />

                {userType === 'creator' && (
                  <>
                    <input type="text" name="stage_name" placeholder="Nome d'Arte" value={formData.stage_name} onChange={handleChange} />
                    <textarea name="bio" placeholder="Biografia" value={formData.bio} onChange={handleChange}></textarea>
                  </>
                )}

                <button type="submit">Registrati</button>
              </form>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
