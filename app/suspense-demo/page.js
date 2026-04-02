import { Suspense } from 'react';

function SlowContent() {
  if (typeof window === 'undefined') {
    const start = Date.now();
    while (Date.now() - start < 1200) {}
  }

  return (
    <section style={{ background: '#eef2ff', padding: '1rem', borderRadius: '8px' }}>
      <h2>Contenu lent rendu</h2>
      <p>Ceci est un contenu simulé qui prend du temps à rendre (1,2s).</p>
      <p>Date/heure de rendu: {new Date().toLocaleTimeString()}</p>
    </section>
  );
}

export default function SuspenseDemoPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Suspense + Streaming</h1>
      <p>
        Le composant parent se rend immédiatement, puis le contenu lent est rendu via Suspense.
        Un fallback apparaît pendant que le contenu est généré.
      </p>

      <Suspense fallback={<div style={{ padding: '1rem', background: '#fff8e1', borderRadius: '8px' }}>Chargement…</div>}>
        <SlowContent />
      </Suspense>
    </main>
  );
}
