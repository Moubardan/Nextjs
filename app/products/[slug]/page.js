import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockProducts } from '@/lib/data';

export default async function ProductPage({ params }) {
  const { slug } = params;

  const product = mockProducts.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  const lastUpdated = new Date().toLocaleTimeString();

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/products" style={{
        display: 'inline-block',
        marginBottom: '2rem',
        color: '#0070f3',
        textDecoration: 'none',
        fontSize: '1.1rem'
      }}>
        ← Back to Products
      </Link>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginTop: 0, color: '#333' }}>{product.name}</h1>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0070f3', marginBottom: '1rem' }}>
              ${product.price}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{
                backgroundColor: product.inStock ? '#d4edda' : '#f8d7da',
                color: product.inStock ? '#155724' : '#721c24',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
              </span>

              <span style={{ fontSize: '1.1rem', color: '#666' }}>
                ⭐ {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>
              {product.description}
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{
                backgroundColor: '#e9ecef',
                color: '#495057',
                padding: '0.25rem 0.75rem',
                borderRadius: '15px',
                fontSize: '0.8rem'
              }}>
                Category: {product.category}
              </span>
            </div>

            <button style={{
              backgroundColor: product.inStock ? '#0070f3' : '#6c757d',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              fontWeight: 'bold'
            }} disabled={!product.inStock}>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 30;

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}