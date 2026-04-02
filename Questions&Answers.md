# Next.js Questions & Answers

## Que se passe-t-il si tu utilises useState dans un Server Component ?

Tu obtiens une erreur. useState ne fonctionne pas dans un Server Component.

Message typique :
```
Error: useState can only be used in Client Components.
```

Pourquoi ?
Parce qu'un Server Component ne s'exécute pas dans le navigateur → donc pas d'état, pas d'interactivité.

Solution : ajouter "use client" en haut du composant.

## Quelle est la différence entre layout.tsx et template.tsx ?

layout.tsx

Se réutilise pour toutes les pages enfants.
Conserve l'état et le DOM entre les navigations.
Comme un frame ou un shell persistant.

Idéal pour : header, sidebar, navbar.

template.tsx

Se ré-exécute à chaque navigation.
Ne conserve pas l'état.
Comme un layout non persistant (re-render complet).

Idéal pour : pages qui doivent toujours repartir de zéro.

## Différence revalidate: 0 vs no-store ?

revalidate: 0
La page est recalculée à chaque requête,
MAIS elle peut encore être mise en cache par un CDN/navigateur si rien ne l'interdit.
Dynamique, mais pas "no-cache" strict.

cache: "no-store"
Aucun cache possible, nulle part (serveur, CDN, navigateur).
La page est toujours régénérée et jamais stockée.
100% no-cache strict.

## Quand utiliser generateStaticParams vs données dynamiques ?

generateStaticParams
Sert à pré-générer des pages à build time.
Utile quand tu connais à l'avance toutes les routes possibles.
Résultat : pages statiques, ultra rapides.
À utiliser pour :

Blog avec slugs connus
Pages produits fixes
Documentation statique

Données dynamiques
Les pages sont générées à la demande, selon la requête.
Pas besoin de connaître les routes à l'avance.
Peut utiliser DB, API, params dynamiques.
À utiliser pour :

Users (/users/[id])
Dashboard
Routes dépendant d'un token/session
Données changeantes

## Pourquoi les Server Actions sont CSRF-safe par défaut ?

1. Elles nécessitent un "action token" unique
Next.js injecte automatiquement un token crypté dans le formulaire ou l'appel.
Un site externe ne peut pas deviner ou générer ce token.

2. Le token est lié à la session de l'utilisateur
Même si un site malveillant essaie d'appeler l'action → token invalide → action rejetée.

3. Les Server Actions ne s'appellent pas via URL
Elles passent par un protocole interne RSC, pas une simple requête publique.
Impossible d'envoyer un POST depuis un autre site.

4. Le cookie de session n'est pas suffisant
Il faut cookie + token signé → protection CSRF automatique.

## Quand garder un Route Handler /api/route.ts plutôt qu'une Server Action ?

1. Tu dois exposer une API publique
Server Actions ne sont pas des endpoints HTTP.
Route handlers → oui.

2. Tu as besoin de méthodes HTTP (GET, POST, PUT, DELETE...)
Server Actions = seulement POST interne.
Route handlers = API REST complète.

3. L'appel vient d'un client externe
Exemples :

Mobile app
Webhook Stripe
Cron job
Server Actions ne peuvent pas être appelées directement.

4. Tu veux du streaming, SSE, file uploads, ou réponses personnalisées
Route handlers gèrent :

Response() custom
headers
cookies avancés
uploads
streaming

Server Actions → non.

5. Tu fais de l'auth API (JWT, API keys)
Server Actions = liées à la session Next.js
Route handlers = flexibles pour auth custom.

## Différence entre protéger une route dans Middleware vs dans le composant avec redirect() ?

Middleware (middleware.ts)

Le middleware s'exécute au niveau du serveur/edge, juste après la requête.
Il bloque ou redirige avant même de charger la page, le layout, le composant.
L'utilisateur ne voit jamais la page protégée.
Aucun JavaScript client n'est envoyé.
Idéal pour : protéger des groupes de routes entiers (/dashboard/:path*).

redirect() dans un Server Component

La page commence à se charger côté serveur (layout, composant...).
Le redirect() est appelé pendant le rendu du composant.
Si la condition est remplie, le serveur renvoie une redirection HTTP.
Le client peut brièvement recevoir du HTML avant la redirection.
Idéal pour : logique conditionnelle fine (rôles, permissions spécifiques).

En résumé :
Middleware = garde à l'entrée, bloque tout avant le rendu.
redirect() = vérification dans le composant, après le début du rendu.

## Pourquoi httpOnly cookies et pas localStorage pour les tokens ?

localStorage

Accessible en JavaScript (document.cookie, localStorage.getItem).
Vulnérable aux attaques XSS : un script injecté peut voler le token.
Pas envoyé automatiquement avec les requêtes HTTP.

httpOnly cookie

NE PEUT PAS être lu en JavaScript. Aucun accès depuis le navigateur.
Envoyé automatiquement avec chaque requête HTTP vers le même domaine.
Protégé contre le vol par XSS.

Les 3 flags de sécurité combinés :
httpOnly = pas de lecture JS.
Secure = envoyé uniquement en HTTPS.
SameSite = bloque les requêtes cross-site (protection CSRF).

httpOnly + Secure + SameSite = très dur à attaquer.

C'est exactement ce que NextAuth fait par défaut avec le cookie next-auth.session-token.