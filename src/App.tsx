import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ImmLandingForm } from './components/login/ImmLandingForm';
import { ImmLanding } from './screens/landing/ImmLanding';
import './App.css'
import { ImmSignUp } from './components/login/ImmSigup';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImmLanding />} />
        <Route path="/login" element={<ImmLandingForm />} />
        <Route path="/signup" element={<ImmSignUp />} />
      </Routes>
    </BrowserRouter>
  );
}