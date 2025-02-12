// src/pages/PaymentMethods.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './PaymentMethods.css';

const PaymentMethods = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [formData, setFormData] = useState({ type: 'card', details: '{}' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      try {
        const response = await api.get('/payment-methods', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPaymentMethod(response.data);
      } catch (error) {
        console.error('Errore nel recupero del metodo di pagamento:', error);
      }
    };
    fetchPaymentMethod();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/payment-methods', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage(response.data.message);
      setPaymentMethod(response.data.paymentMethod);
    } catch (error) {
      console.error('Errore nel salvataggio del metodo di pagamento:', error);
      setMessage('Errore nel salvataggio.');
    }
  };

  return (
    <div className="payment-methods-page">
      <h1>Metodo di Pagamento</h1>
      {paymentMethod ? (
        <div className="current-method">
          <p>Tipo: {paymentMethod.type}</p>
          <p>Dettagli: {paymentMethod.details}</p>
        </div>
      ) : (
        <p>Nessun metodo di pagamento impostato.</p>
      )}
      <form onSubmit={handleSubmit} className="payment-form">
        <label>
          Tipo:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="card">Carta di Credito/Debito</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <label>
          Dettagli (JSON):
          <input type="text" name="details" value={formData.details} onChange={handleChange} placeholder='{"number": "xxxx-xxxx-xxxx-xxxx", "expiry": "MM/YY"}' />
        </label>
        <button type="submit">Salva Metodo</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentMethods;
