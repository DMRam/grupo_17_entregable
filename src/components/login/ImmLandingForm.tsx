import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstanceAuth from '../../api/axios/ImmAxios';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useUser } from '../../hooks/useUser';
import { GoogleSignIn } from '../google/GoogleSignin';
import './imm_login.css'; // Assuming Bootstrap CSS is already imported
import { Spinner } from 'react-bootstrap';


export const ImmLandingForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { userLoggedGlobal } = useUser();
    const navigate = useNavigate(); // Initialize useHistory with type History
    const { onUserLoggingOut, isUserLoggedOut } = useAuthentication()
    const { onAddUserLoggedToGlobalAppState } = useUser()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const credentials = { email, password }; // Prepare credentials for login
            const response = await axiosInstanceAuth.post('/auth/login', credentials);
            console.log(response.data + ' - Login successful');
            onAddUserLoggedToGlobalAppState(response.data.user)
            if (isUserLoggedOut) {
                onUserLoggingOut()
            }

            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            console.error('Failed to login:', error);
            setError('Invalid email or password'); // Set error message for failed login
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    console.log(userLoggedGlobal.name + ' userLoggedGlobal.name');

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="form-title">Login</h2>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-grid gap-2 mb-3">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                    </button>
                </div>

                <GoogleSignIn />
                <div className="text-center">
                    <Link to="/signup" className="link">
                        Register
                    </Link>
                    <span className="mx-2">or</span>
                    <Link to="/" className="link">
                        Go back to Landing Page
                    </Link>
                    <h1>{userLoggedGlobal.name}</h1>
                </div>
            </form>
        </div>
    );
};
