// ImmLandingForm.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './imm_login.css'; // Assuming Bootstrap CSS is already imported

export const ImmLandingForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
                <div className="mt-3 text-center">
                    <Link to="/signup" >Register</Link>
                    <span className="mx-2">or</span>
                    <Link to="/">Go back to Landing Page</Link>
                </div>
            </form>
        </div>
    );
};