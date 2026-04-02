'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Home() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();
    setErrors({});
    setServerError(null);

    const parse = loginSchema.safeParse({ email, password });
    if (!parse.success) {
      const fieldErrors = {};
      parse.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/dashboard',
    });

    if (result?.error) {
      setServerError(result.error);
      return;
    }

    if (result?.ok) {
      router.push('/dashboard');
    }
  }

  if (status === 'loading') {
    return null;
  }

  if (session) {
    return (
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#333' }}>
          Welcome back, {session.user.name || session.user.email}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
          You are logged in.
        </p>
        <Link href="/dashboard" style={{
          padding: '0.75rem 2rem',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: 'bold',
        }}>
          Go to Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#333' }}>
        Welcome to this NextJS App
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', maxWidth: '500px' }}>
        Sign in to access your dashboard.
      </p>

      <form onSubmit={handleLogin} style={{
        display: 'grid',
        gap: '0.5rem',
        width: '100%',
        maxWidth: '360px',
      }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
        />
        {errors.email && <span style={{ color: 'red', fontSize: '0.85rem', textAlign: 'left' }}>{errors.email}</span>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
        />
        {errors.password && <span style={{ color: 'red', fontSize: '0.85rem', textAlign: 'left' }}>{errors.password}</span>}

        <button type="submit" style={{
          padding: '0.75rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: '0.5rem',
        }}>
          Login
        </button>

        {serverError && <div style={{ color: 'red', marginTop: '0.5rem' }}>{serverError}</div>}
      </form>

      <p style={{ marginTop: '1.5rem', color: '#666' }}>
        No account? <Link href="/register" style={{ color: '#0070f3' }}>Register</Link>
      </p>
    </main>
  );
}
