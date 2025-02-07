import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import CreatorProfile from './pages/CreatorProfile';
import ForgotPassword from './pages/ForgotPassword';
import Feed from './pages/Feed';
import Subscriptions from './pages/Subscriptions';
import ContentManagement from './pages/ContentManagement';
import SearchResults from './pages/SearchResults';



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/creator/:creatorId" element={<CreatorProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/content" element={<ContentManagement />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

