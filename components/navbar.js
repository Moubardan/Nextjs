'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButtons from './auth-buttons';
import classes from './navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  function linkClass(href) {
    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
    return isActive ? classes.active : undefined;
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>
        <Link href="/">Next.js Demo</Link>
      </div>
      <ul className={classes.navLinks}>
        <li>
          <Link href="/" className={linkClass('/')}>Home</Link>
        </li>
        <li>
          <Link href="/products" className={linkClass('/products')}>Products (SSG)</Link>
        </li>
        <li>
          <Link href="/articles" className={linkClass('/articles')}>Articles (ISR)</Link>
        </li>
        <li>
          <Link href="/tasks" className={linkClass('/tasks')}>Tasks (CRUD)</Link>
        </li>
        <AuthButtons />
      </ul>
    </nav>
  );
}