'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  async function handleRegister(event) {
    event.preventDefault();
    setErrors({});
    setServerError(null);
    setSuccess(null);

    const parse = registerSchema.safeParse({ name, email, password });
    if (!parse.success) {
      const fieldErrors = {};
      parse.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!data.success) {
      setServerError(typeof data.error === 'string' ? data.error : 'Registration failed');
      return;
    }

    setSuccess('Registered successfully. Redirecting to login...');
    setTimeout(() => router.push('/login'), 1200);
  }

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2.5rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{ textAlign: 'center', marginTop: 0, marginBottom: '0.5rem', color: '#333' }}>Create Account</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem' }}>Fill in the details below to register.</p>

        <form onSubmit={handleRegister} style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
          {errors.name && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.name}</span>}

          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555', marginTop: '0.5rem' }}>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
          {errors.email && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.email}</span>}

          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#555', marginTop: '0.5rem' }}>Password</label>
          <input
            type="password"
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
          {errors.password && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.password}</span>}

          <button type="submit" style={{
            padding: '0.75rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem',
          }}>
            Register
          </button>
        </form>

        {serverError && <p style={{ color: '#e53e3e', textAlign: 'center', marginTop: '1rem' }}>{serverError}</p>}
        {success && <p style={{ color: '#38a169', textAlign: 'center', marginTop: '1rem' }}>{success}</p>}

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666' }}>
          Already have an account? <a href="/login" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>Login</a>
        </p>
      </div>
    </main>
  );
}