// ImmRegistrationForm.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import './imm_registration.css'; // Import your CSS file for styling

export const ImmRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: "BROKER_ROLE",
  });
  const [error, setError] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'repeatPassword') {
      setRepeatPassword(value);
    } else if (name === 'role') {
      setFormData({ ...formData, role: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  // const assignRole = (role: string) => {
  //   switch (role) {
  //     case 'corredor':
  //       return 'BROKER_ROLE';
  //     case 'arrendatario':
  //       return 'TENANT_ROLE';
  //     case 'dueño':
  //       return 'OWNER_ROLE';
  //     case 'administrador':
  //       return 'ADMIN_ROLE';
  //     default:
  //       return '';
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    // const role = 
    // if (!role) {
    //   setError('Invalid user type.');
    //   return;
    // }

    try {
      const { name, email, password, role } = formData;
      const userData = { name, email, password, role };
      console.log("AXIOS => " + JSON.stringify(userData))
      const response = await axios.post('https://grupo-17-418915.uc.r.appspot.com/api/users/', userData);
      console.log('Form submitted:', response.data);
      // Reset form data after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
        role: '',
      });
      setRepeatPassword('');
      setError('');
      navigate('/login')
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again.');
    }
  };


  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Registration</h2>
        <div className="form-group mb-3">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Ingresa tu nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Ingresa tu email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password === '' ? '' : formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="repeatPassword">Verifica tu Password</label>
          <input
            type="password"
            className="form-control"
            id="repeatPassword"
            name="repeatPassword"
            placeholder="Repeat your password"
            value={repeatPassword}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="form-group mb-3">
          <label htmlFor="role">Eres un:</label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="corredor">Corredor</option>
            <option value="arrendatario">Arrendatario</option>
            <option value="dueño">Dueño</option>
            <option value="administrador">Administrador de Edificio</option>
          </select>
        </div> */}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-grid gap-2 mb-3">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
        <div className="text-center">
          <Link to="/login" className="link">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};