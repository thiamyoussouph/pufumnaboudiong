# SILLAGE — Boutique de parfums (Next.js + Prisma + Cloudinary + NextAuth)

Boutique e-commerce complète avec **espace boutique** (back-office) où le propriétaire
gère lui-même ses parfums : nom, famille, prix, description, photo et pyramide olfactive.

- **Vitrine** : catalogue, panier, checkout (Wave / Orange Money / PayDunya)
- **Back-office `/admin`** : ajout, modification, suppression de parfums
- **Base de données** : MySQL via Prisma
- **Photos** : upload vers Cloudinary
- **Connexion sécurisée** : NextAuth (email + mot de passe)

---

## Installation pas à pas

### 1. Prérequis
- Node.js 18+
- Une base MySQL (locale ou en ligne)
- Un compte Cloudinary (gratuit) : https://cloudinary.com

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Copie le fichier d'exemple puis remplis-le :
```bash
cp .env.example .env
```
Renseigne dans `.env` :
- `DATABASE_URL` : ta connexion MySQL
- `NEXTAUTH_SECRET` : génère-le avec `openssl rand -base64 32`
- Les 3 clés `CLOUDINARY_...` (tableau de bord Cloudinary)

### 4. Créer les tables + données de départ
```bash
npm run db:push      # crée les tables dans MySQL
npm run db:seed      # crée l'admin + 6 parfums de démo
```

### 5. Lancer le projet
```bash
npm run dev
```
Ouvre http://localhost:3000

---

## Accès à l'espace boutique

- URL : http://localhost:3000/admin (redirige vers /login si non connecté)
- Identifiants par défaut (définis dans `.env`) :
  - Email : `admin@sillage.sn`
  - Mot de passe : `sillage2026`

> Change ces identifiants dans `.env` avant toute mise en production.

---

## Comment le client gère ses parfums

1. Se connecter sur `/login`
2. Sur `/admin`, cliquer sur **« + Ajouter un parfum »**
3. Remplir le nom, la famille, le prix, la description
4. Téléverser une **photo** (envoyée automatiquement sur Cloudinary)
5. (Optionnel) renseigner la pyramide olfactive
6. Enregistrer → le parfum apparaît aussitôt sur la boutique

Modifier ou supprimer se fait depuis la liste du catalogue.

---

## Structure

```
sillage-parfums/
├── prisma/
│   ├── schema.prisma        # Modèles Product + User
│   └── seed.js              # Admin + parfums de démo
├── app/
│   ├── layout.jsx           # Layout vitrine + panier
│   ├── page.jsx             # Accueil (lit la base)
│   ├── checkout/page.jsx    # Commande + confirmation
│   ├── login/page.jsx       # Connexion NextAuth
│   ├── admin/
│   │   ├── layout.jsx       # Barre back-office + session
│   │   ├── page.jsx         # Liste des parfums
│   │   ├── new/page.jsx     # Ajouter
│   │   ├── [id]/edit/page.jsx  # Modifier
│   │   └── actions.js       # Server Actions (create/update/delete + Cloudinary)
│   └── api/auth/[...nextauth]/route.js
├── components/              # Header, Hero, Collection, ProductCard, ProductForm, CartDrawer…
├── context/CartContext.jsx  # Panier
├── lib/
│   ├── prisma.js            # Client Prisma
│   ├── cloudinary.js        # Upload photos
│   ├── auth.js              # Config NextAuth
│   ├── queries.js           # Lecture produits
│   └── format.js            # Formatage FCFA
└── middleware.js            # Protège /admin
```

---

## Déploiement (Vercel)

1. Pousse le code sur GitHub
2. Importe le repo sur Vercel
3. Ajoute les mêmes variables d'environnement dans les réglages Vercel
4. Utilise une base MySQL accessible en ligne (PlanetScale, Railway, ton hébergeur…)
5. Après le premier déploiement, lance le seed une fois (script ou Prisma Studio)

## Prochaines étapes possibles
- Paiement réel via l'API PayDunya
- Enregistrement des commandes en base (modèle Order)
- SMS de confirmation (Africa's Talking)
- Gestion du stock

---
© 2026 SILLAGE — Dakar, Sénégal
