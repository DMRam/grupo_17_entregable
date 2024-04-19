import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ImmLandingForm } from './components/login/ImmLandingForm';
import { ImmLanding } from './screens/landing/ImmLanding';
import './App.css'
import { Provider } from 'react-redux';
import store from './store';
import { ProtectedRoute } from './screens/protected/ProtectedRoute';
import { ImmRegistrationForm } from './components/login/ImmRegistrationForm';
import { GridView } from './screens/new/GridView';
import { CreateView } from './screens/new/CreateView';
// import { RefreshProvider } from './provider/RefreshProvider';


export const App = () => {

  return (
    // <RefreshProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<ImmLanding />} />
            <Route path="/login" element={<ImmLandingForm />} />
            <Route path="/signup" element={<ImmRegistrationForm />} />
            {/* <Route path="/dashboard" element={<ImmDashboard />} /> */}
            <Route path="/dashboard" element={<ProtectedRoute />} />
            <Route path="/create_view" element={<GridView />} />
            <Route path="/create_view_ii" element={<CreateView />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    // </RefreshProvider>

  );
}