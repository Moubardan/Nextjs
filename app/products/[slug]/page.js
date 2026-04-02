import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockProducts } from '../../../lib/data';

export async function generateMetadata({ params }) {
  const product = mockProducts.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product not found',
      description: 'No product found',
    };
  }

  return {
    title: `${product.name} • NextJS Course App`,
    description: `${product.name} - ${product.description}`,
    openGraph: {
      title: `${product.name} • NextJS Course App`,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = params;

  const product = mockProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const lastUpdated = new Date().toLocaleTimeString();

  const imageMap = {
    laptop: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    headphones: 'https://images.unsplash.com/photo-1518444027830-994f95b0354c?auto=format&fit=crop&w=1200&q=80',
    'smart-watch': 'https://images.unsplash.com/photo-1514001313285-6927f0336e76?auto=format&fit=crop&w=1200&q=80',
    tablet: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1e?auto=format&fit=crop&w=1200&q=80',
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <Link
        href="/products"
        style={{
          display: 'inline-block',
          marginBottom: '2rem',
          color: '#0070f3',
          textDecoration: 'none',
          fontSize: '1.1rem',
        }}
      >
        ← Back to Products
      </Link>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ marginTop: 0, color: '#333' }}>{product.name}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ width: '100%', minHeight: '260px', position: 'relative' }}>
            <Image
              src={imageMap[slug] || 'https://images.unsplash.com/photo-1514474959185-2f4f7b5da3b0?auto=format&fit=crop&w=1200&q=80'}
              alt={product.name}
              fill
              style={{ objectFit: 'cover', borderRadius: '12px' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0070f3', marginBottom: '1rem' }}>
              ${product.price}
            </p>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem' }}>{product.description}</p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Category:</strong> {product.category}
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Stock:</strong> {product.inStock ? 'In stock' : 'Out of stock'}
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Rating:</strong> {product.rating} ({product.reviews} reviews)
            </p>
            <p style={{ fontSize: '0.9rem', color: '#999' }}>Last updated: {lastUpdated}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 30;

export async function generateStaticParams() {
  return mockProducts.map((product) => ({ slug: product.slug }));
}