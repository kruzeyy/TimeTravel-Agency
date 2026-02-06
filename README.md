# TimeTravel Agency

**Projet pédagogique M1/M2 Digital & IA**

---

## Description

**TimeTravel Agency** est une webapp d’agence de voyages temporels de luxe. Elle présente trois destinations : **Paris 1889** (Exposition universelle), le **Crétacé** (dinosaures) et **Florence 1504** (Renaissance). Le site inclut une landing page interactive, un chatbot assisté par IA (Mistral) et un quiz de recommandation de destination.

---

## Stack technique

| Technologie        | Usage                                      |
|--------------------|--------------------------------------------|
| **React 18**       | Interface utilisateur, composants          |
| **Vite**           | Build et serveur de développement          |
| **Tailwind CSS**   | Styles, thème sombre, responsive          |
| **Framer Motion**  | Animations et transitions                  |
| **Mistral AI API** | Réponses du chatbot (modèle mistral-small) |
| **Vercel**         | Hébergement et déploiement (optionnel)     |

---

## Fonctionnalités implémentées

- **Landing page interactive** : structure Hero → Destinations → Quiz → Contact, navigation fixe, design cohérent.
- **Hero avec vidéo de fond** : section d’accueil avec vidéo en arrière-plan (fallback dégradé si absence de fichier).
- **Galerie des 3 destinations** : Paris 1889, Crétacé, Florence 1504 avec images hero et descriptions.
- **Cards interactives** : cartes par destination avec images (lazy loading), hover (scale, translation), animations d’entrée au scroll.
- **Chatbot IA** : widget flottant ; questions/réponses générées par l’API Mistral (mistral-small-latest), personnalité « assistant TimeTravel Agency ».
- **Quiz interactif** *(optionnel)* : 4 questions pour recommander une destination avec explication personnalisée.
- **Animations** *(optionnel)* : fade-in au scroll (Hero, Destinations, Footer), apparition du titre Hero, hover sur cartes et boutons (Framer Motion).

---

## IA utilisées

| Usage              | Outil / API                          |
|--------------------|--------------------------------------|
| **Code**           | Cursor + Claude 3.5 Sonnet           |
| **Chatbot**        | Mistral Small (API Mistral AI)       |
| **Visuels / vidéos** | Midjourney + Runway (assets)      |

---

## Installation et lancement en local

### Prérequis

- **Node.js** 18+ (recommandé : LTS)
- **npm** (ou yarn / pnpm)

### Étapes

1. **Cloner ou télécharger le projet** puis se placer dans le dossier :

   ```bash
   cd time-travel-agency
   ```

2. **Installer les dépendances** :

   ```bash
   npm install
   ```

3. **Variables d’environnement (pour le chatbot)**  
   Créer un fichier `.env` à la racine (voir `.env.example`) et renseigner la clé API Mistral :

   ```env
   VITE_MISTRAL_API_KEY=votre_cle_api_mistral
   ```

   Sans clé, le chatbot affichera un message indiquant que la clé est manquante.

   **Sur Vercel** : ne committez jamais `.env` (risque de vol de clé). Ajoutez `VITE_MISTRAL_API_KEY` dans **Project → Settings → Environment Variables** sur le dashboard Vercel pour que le chatbot fonctionne en production.

4. **Lancer le serveur de développement** :

   ```bash
   npm run dev
   ```

5. **Ouvrir l’application** dans le navigateur : [http://localhost:5173](http://localhost:5173).

### Build de production

```bash
npm run build
npm run preview   # Prévisualiser le build localement
```

Les fichiers de build sont générés dans le dossier `dist/`, prêts pour un déploiement (ex. Vercel).

**Déploiement sur Vercel** : un guide pas à pas (compte, GitHub, config, variable d’environnement, vérifications, tests desktop/mobile) est dans **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

---

## Structure du projet

```
time-travel-agency/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example          # Exemple de variables d'environnement
├── public/
│   ├── favicon.svg
│   └── assets/           # Images hero, vidéo hero
│       ├── hero-paris.jpg
│       ├── hero-cretace.jpg
│       ├── hero-florence.jpg
│       └── hero-video.mp4
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Header.jsx
        ├── Hero.jsx
        ├── DestinationCard.jsx
        ├── DestinationCards.jsx
        ├── Quiz.jsx
        ├── Chatbot.jsx
        └── Footer.jsx
```

---

## Captures d’écran / rendu

*(Section optionnelle : vous pouvez ajouter ici des captures d’écran ou un lien vers une maquette.)*

- **Hero** : section d’accueil avec vidéo de fond et titre « Voyagez à travers le temps ».
- **Destinations** : grille de 3 cartes (Paris 1889, Crétacé, Florence 1504) avec image, titre, description et CTA.
- **Quiz** : questions à choix multiples puis écran de résultat avec destination recommandée et explication.
- **Chatbot** : bouton flottant en bas à droite ; fenêtre de chat avec historique et champ de saisie.

---

## Licence

Ce projet est réalisé dans un **cadre pédagogique** (M1/M2 Digital & IA). Il est fourni « en l’état » pour usage éducatif. Les assets (images, vidéos) et APIs tierces restent soumis à leurs conditions d’utilisation respectives.

---

## Crédits

- **API Mistral AI** : [mistral.ai](https://mistral.ai) — réponses du chatbot.
- **Visuels et vidéos** : générés avec Midjourney et Runway (projet pédagogique).
- **Polices** : Google Fonts (DM Sans, Playfair Display).
- **Framework et librairies** : React, Vite, Tailwind CSS, Framer Motion (licences respectives).

---

*TimeTravel Agency — Projet pédagogique M1/M2 Digital & IA*
