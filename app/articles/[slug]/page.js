import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockArticles } from '../../../lib/data';

export async function generateMetadata({ params }) {
  const article = mockArticles.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: 'Article not found',
      description: 'No article found',
    };
  }

  return {
    title: `${article.title} • NextJS Course App`,
    description: `${article.content.substring(0, 120)}...`,
    openGraph: {
      title: `${article.title} • NextJS Course App`,
      description: article.content.substring(0, 120),
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = params;

  const article = mockArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const lastUpdated = new Date().toLocaleString();
  const viewCount = Math.floor(Math.random() * 1000) + 100;

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link
        href="/articles"
        style={{
          display: 'inline-block',
          marginBottom: '2rem',
          color: '#0070f3',
          textDecoration: 'none',
          fontSize: '1.1rem',
        }}
      >
        ← Back to Articles
      </Link>

      <article
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <header style={{ marginBottom: '2rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}
          >
            <h1 style={{ margin: 0, color: '#333', lineHeight: '1.2' }}>{article.title}</h1>
            <span
              style={{
                backgroundColor: '#0070f3',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
              }}
            >
              {article.category}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666' }}>
            <span>
              By <strong>{article.author}</strong> • Published {article.publishedAt}
            </span>
            <span>👁️ {viewCount} views</span>
          </div>
        </header>

        <div style={{ lineHeight: '1.8', color: '#333', fontSize: '1.1rem' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#555' }}>{article.content}</p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2 style={{ color: '#333', marginTop: '2rem' }}>Key Takeaways</h2>
          <ul>
            <li>Incremental Static Regeneration combines the best of static and dynamic rendering</li>
            <li>Pages are pre-generated for instant loading</li>
            <li>Content automatically updates in the background</li>
            <li>Perfect balance between performance and freshness</li>
          </ul>

          <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#999' }}>Updated at: {lastUpdated}</p>
        </div>
      </article>
    </main>
  );
}

export const revalidate = 30;

export async function generateStaticParams() {
  return mockArticles.map((article) => ({ slug: article.slug }));
}