# Next.js Demo App

Prototype de Next.js 14 avec App Router + Server/Client Components + NextAuth v4 + SSG/ISR + Server Actions.

## Fonctionnalités incluses

- Pages produits `app/products` (SSG + `generateStaticParams`)
- Pages articles `app/articles` (ISR + `revalidate` + `generateStaticParams`)
- Server Actions CRUD tâches `app/tasks` + `app/tasks/actions.js`
- Auth NextAuth v4
  - Credentials + Google OAuth
  - JWT session
  - `pages/api/auth/[...nextauth]/route.js`
  - `app/api/register/route.js`
  - `lib/users.js`
- Middleware route-protégée
  - `middleware.ts` active protection sur `/dashboard`
- `next/image` + `next/font` + metadata dynamique (`generateMetadata`)

## Prérequis

- Node 20+ (recommandé)
- npm 10+ (ou yarn)
- Compte Google OAuth (facultatif)

## Setup local

1. cloner le repo
2. `cd 01-starting-project`
3. `npm install`
4. créer un fichier `.env.local` à la racine avec :

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=une_vm_chaîne_très_longue_et_sécurisée
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=yyy
```

5. `npm run dev`

## Workflow principal

- `http://localhost:3000` page main.
- `/login` page login.
- `/register` page inscription.
- `/dashboard` page protégée (redirect login si pas connecté).
- `/products`, `/products/[slug]` + metadata dynamiques.
- `/articles`, `/articles/[slug]` + metadata dynamiques.
- `/tasks` CRUD Server Actions.

## Sécurité

- Aucun secret côté client.
- `.env.local` est dans `.gitignore`.
- NextAuth utilise `NEXTAUTH_SECRET`.

## Remarques

- store utilisateur en mémoire dans `lib/users.js` : pour démo uniquement.
- pour production, remplacer par base de données réelle / hashing de mots de passe.
