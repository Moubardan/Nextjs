'use client';

import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classes from './navbar.module.css';

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === 'loading') {
    return null;
  }

  if (session) {
    const isDashboard = pathname.startsWith('/dashboard');
    return (
      <>
        <li><Link href="/dashboard" className={isDashboard ? classes.active : undefined}>Dashboard</Link></li>
        <li>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{
              background: 'none',
              border: '1px solid currentColor',
              color: 'inherit',
              cursor: 'pointer',
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              font: 'inherit',
            }}
          >
            Logout
          </button>
        </li>
      </>
    );
  }

  const isLogin = pathname === '/login';
  return (
    <li><Link href="/login" className={isLogin ? classes.active : undefined}>Login</Link></li>
  );
}