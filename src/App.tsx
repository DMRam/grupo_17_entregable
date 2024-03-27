import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ImmLandingForm } from './components/login/ImmLandingForm';
import { ImmSigup } from './components/login/ImmSigup';
import { ImmLanding } from './screens/landing/ImmLanding';
import './App.css'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImmLanding />} />
        <Route path="/login" element={<ImmLandingForm />} />
        <Route path="/signup" element={<ImmSigup />} />
      </Routes>
    </BrowserRouter>
  );
}