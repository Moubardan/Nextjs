'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
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

  return (
    <main style={{ padding: '2rem', maxWidth: '420px', margin: '2rem auto' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'grid', gap: '0.5rem' }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.email}</span>}

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.password}</span>}

        <button type="submit" style={{ padding: '0.75rem 1rem', cursor: 'pointer', marginTop: '0.5rem' }}>Login</button>
        {serverError && <div style={{ color: 'red', marginTop: '0.5rem' }}>{serverError}</div>}
      </form>

      <div style={{ marginTop: '1.5rem' }}>
        <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })} style={{ padding: '0.75rem 1rem', cursor: 'pointer' }}>
          Sign in with Google
        </button>
      </div>

      <p style={{ marginTop: '1rem' }}>
        Pas encore inscrit ? <a href="/register">Register</a>
      </p>
    </main>
  );
}