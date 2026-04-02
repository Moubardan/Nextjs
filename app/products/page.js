import Link from 'next/link';
import { mockProducts } from '../../lib/data';

export default async function ProductsPage() {
  
  const products = mockProducts;

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🛍️ Product Catalog (SSG)</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        This page is generated at build time using Static Site Generation (SSG) with generateStaticParams.
        The data is pre-rendered and served from cache for optimal performance.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {products.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            backgroundColor: 'white'
          }}>
            <h2 style={{ marginTop: 0, color: '#333' }}>{product.name}</h2>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0070f3' }}>
              ${product.price}
            </p>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              {product.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{
                backgroundColor: product.inStock ? '#d4edda' : '#f8d7da',
                color: product.inStock ? '#155724' : '#721c24',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.8rem'
              }}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                ⭐ {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <Link
              href={`/products/${product.slug}`}
              style={{
                display: 'inline-block',
                backgroundColor: '#0070f3',
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'background-color 0.2s'
              }}
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>

    </main>
  );
}

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}