// ImmLandingForm.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { GoogleSignIn } from '../google/GoogleSignin';
import './imm_login.css'; // Assuming Bootstrap CSS is already imported

export const ImmLandingForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { userLoggedGlobal } = useUser()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Basic email validation
        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Simulate API call or actual login logic
            await login(email, password);
            // Navigate to dashboard or next page on successful login
            console.log('Login successful');
        } catch (error) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    console.log(userLoggedGlobal.name + " userLoggedGlobal.name")

    const login = async (email: string, password: string) => {
        // Simulate API call or actual login logic
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                // Resolve or reject based on login result
                if (email === 'user@example.com' && password === 'password') {
                    resolve();
                } else {
                    reject();
                }
            }, 1500); // Simulate delay for API call
        });
    };

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
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </div>
                <GoogleSignIn />
                <div className="text-center">
                    <Link to="/signup" className="link">Register</Link>
                    <span className="mx-2">or</span>
                    <Link to="/" className="link">Go back to Landing Page</Link>
                    <h1>{userLoggedGlobal.name}</h1>
                </div>
            </form>
        </div>
    );
};
