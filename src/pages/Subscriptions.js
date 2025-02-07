import React, { useState } from 'react';
import api from '../services/api';

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: '', price: '' });

  const handleAddPlan = async () => {
    try {
      const response = await api.post('/subscriptions', newPlan);
      setPlans([...plans, response.data]);
      setNewPlan({ name: '', price: '' });
    } catch (error) {
      console.error('Errore nella creazione dell\'abbonamento:', error);
    }
  };

  return (
    <div>
      <h1>Gestione Abbonamenti</h1>
      <div>
        <input
          type="text"
          placeholder="Nome abbonamento"
          value={newPlan.name}
          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Prezzo (€)"
          value={newPlan.price}
          onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
        />
        <button onClick={handleAddPlan}>Aggiungi Abbonamento</button>
      </div>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            {plan.name} - €{plan.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subscriptions;
