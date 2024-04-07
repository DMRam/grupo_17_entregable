import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ImmLandingForm } from './components/login/ImmLandingForm';
import { ImmLanding } from './screens/landing/ImmLanding';
import './App.css'
import { ImmSignUp } from './components/login/ImmSigup';
import { Provider } from 'react-redux';
import store from './store';
import { ImmDashboard } from './screens/dashboard/ImmDashboard';
import { ProtectedRoute } from './screens/protected/ProtectedRoute';
import { useAuthentication } from './hooks/useAuthentication';


export const App = () => {


  
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<ImmLanding />} />
          <Route path="/login" element={<ImmLandingForm />} />
          <Route path="/signup" element={<ImmSignUp />} />
          {/* <Route path="/dashboard" element={<ImmDashboard />} /> */}
          <Route path="/dashboard" element={<ProtectedRoute />} />
        </Routes>
      </Provider>
    </BrowserRouter>

  );
}