// LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleSignIn } from '../../components/google/GoogleSignin';
import { useAuthentication } from '../../hooks/useAuthentication';
import './imm_landing.css'

export const ImmLanding = () => {
    

    return (
        <div className="landing-page">
            <h1>Bienvenido a Immobilier</h1>
            <h3>Tu escritorio de corretaje virtual</h3>
            <p>Regístrate o crea una cuenta para comenzar</p>
            <div className="auth-buttons">
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
            </div>
            <br />
            <br />
            <br />
            <hr />
            {/* <GoogleSignIn /> */}

        </div>
    );
}