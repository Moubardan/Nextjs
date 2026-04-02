import Link from 'next/link';
import { mockArticles } from '../../lib/data';

export default function ArticlesPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>📝 Articles (ISR Demo)</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        This articles section demonstrates Incremental Static Regeneration (ISR).
        Article pages are pre-generated but automatically revalidated every 30 seconds.
      </p>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {mockArticles.map((article) => (
          <article key={article.id} style={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, color: '#333' }}>
                <Link
                  href={`/articles/${article.slug}`}
                  style={{ color: '#0070f3', textDecoration: 'none' }}
                >
                  {article.title}
                </Link>
              </h2>
              <span style={{
                backgroundColor: '#e9ecef',
                color: '#495057',
                padding: '0.25rem 0.75rem',
                borderRadius: '15px',
                fontSize: '0.8rem'
              }}>
                {article.category}
              </span>
            </div>

            <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
              {article.content.substring(0, 150)}...
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                By {article.author} • {article.publishedAt}
              </span>
              <Link
                href={`/articles/${article.slug}`}
                style={{
                  color: '#0070f3',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}