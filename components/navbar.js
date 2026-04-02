import Link from 'next/link';
import classes from './navbar.module.css';

export default function Navbar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>
        <Link href="/">Next.js Demo</Link>
      </div>
      <ul className={classes.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products (SSG)</Link>
        </li>
        <li>
          <Link href="/articles">Articles (ISR)</Link>
        </li>
        <li>
          <Link href="/suspense-demo">Suspense Demo</Link>
        </li>
        <li>
          <Link href="/tasks">Tasks (CRUD)</Link>
        </li>
      </ul>
    </nav>
  );
}