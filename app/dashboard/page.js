import { getCurrentUser } from '../../lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getCurrentUser();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '2rem auto' }}>
      <h1>Dashboard</h1>
      <p>Welcome back, {session.user.name ?? session.user.email}.</p>
      <p>Your session is JWT-based and protected by middleware.</p>
      <p>Email: {session.user.email}</p>
    </main>
  );
}

export const metadata = {
  title: 'Dashboard • NextJS Course App',
  description: 'Protected dashboard page (middleware + NextAuth credentials + Google).',
};