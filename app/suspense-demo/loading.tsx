export default function Loading() {
    return (
        <main style={{ maxWidth: '800px', margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
            <h1>Suspense Demo</h1>
            <div style={{ padding: '1rem', background: '#fff8e1', borderRadius: '8px' }}>
                Chargement initial de la page... Patientez un instant.
            </div>
        </main>
    );
}
