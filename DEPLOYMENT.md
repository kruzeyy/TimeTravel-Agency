# Guide de déploiement : TimeTravel Agency sur Vercel

Ce guide vous permet de mettre en ligne la webapp **TimeTravel Agency** sur Vercel, pas à pas, même si vous n’avez jamais déployé de projet.

---

## Étape 1 : Créer un compte Vercel (si besoin)

1. Rendez-vous sur **[vercel.com](https://vercel.com)**.
2. Cliquez sur **« Sign Up »** (S’inscrire).
3. Choisissez **« Continue with GitHub »** pour lier directement votre dépôt.
4. Autorisez Vercel à accéder à votre compte GitHub lorsque c’est demandé.
5. Votre compte Vercel gratuit est prêt.

> **Astuce** : Un compte gratuit suffit pour des projets personnels ou pédagogiques.

---

## Étape 2 : Pousser le projet sur GitHub

Si le projet n’est pas encore sur GitHub :

1. Créez un **nouveau dépôt** sur [github.com](https://github.com) (par ex. `time-travel-agency`).
2. Dans le dossier du projet sur votre ordinateur, exécutez :

   ```bash
   git init
   git add .
   git commit -m "Initial commit - TimeTravel Agency"
   git branch -M main
   git remote add origin https://github.com/VOTRE_UTILISATEUR/time-travel-agency.git
   git push -u origin main
   ```

   Remplacez `VOTRE_UTILISATEUR` par votre nom d’utilisateur GitHub.

3. Vérifiez sur GitHub que tous les fichiers sont bien présents (sauf le dossier `node_modules` et le fichier `.env`, qui doivent être ignorés par Git).

---

## Étape 3 : Importer le projet sur Vercel

1. Connectez-vous sur **[vercel.com](https://vercel.com)**.
2. Cliquez sur **« Add New… »** puis **« Project »**.
3. Dans la liste des dépôts, trouvez **time-travel-agency** (ou le nom de votre repo).
4. Cliquez sur **« Import »** à côté du dépôt.

---

## Étape 4 : Configuration du projet (détection automatique)

Vercel détecte en général tout seul un projet **Vite + React** :

- **Framework Preset** : **Vite**
- **Root Directory** : laisser vide (racine du repo)
- **Build Command** : `npm run build` (proposé par défaut)
- **Output Directory** : `dist` (proposé par défaut)
- **Install Command** : `npm install`

Vous n’avez en principe **rien à modifier** : validez tel quel.

---

## Étape 5 : Variable d’environnement (pour le chatbot IA)

Pour que le **chatbot Mistral** fonctionne en production :

1. Dans la même page de configuration, ouvrez la section **« Environment Variables »**.
2. **Name** : `VITE_MISTRAL_API_KEY`  
   **Value** : votre clé API Mistral (récupérable sur [console.mistral.ai](https://console.mistral.ai)).
3. Cochez **Production** (et éventuellement Preview si vous voulez que le chatbot marche aussi sur les prévisualisations).
4. Cliquez sur **« Add »**.

Sans cette variable, le site tournera normalement mais le chatbot affichera un message indiquant que la clé est manquante.

---

## Étape 6 : Déploiement en un clic

1. Cliquez sur **« Deploy »**.
2. Attendez 1 à 2 minutes : Vercel installe les dépendances, lance le build, puis déploie.
3. Quand le statut est **« Ready »**, un lien du type **`https://time-travel-agency-xxx.vercel.app`** s’affiche.
4. Cliquez sur **« Visit »** (ou sur le lien) pour ouvrir votre webapp en ligne.

Votre site est en ligne.

---

## Étape 7 : Vérifier que tout fonctionne en ligne

Ouvrez l’URL de déploiement et contrôlez les points suivants :

| Élément | À vérifier |
|--------|------------|
| **Hero vidéo** | La vidéo de fond de la section d’accueil se charge et joue (ou le dégradé de secours s’affiche). |
| **Cartes des destinations** | Les 3 cartes (Paris 1889, Crétacé, Florence 1504) s’affichent avec images, texte et boutons. |
| **Chatbot IA** | Le bouton de chat en bas à droite ouvre la fenêtre ; une question envoyée reçoit une réponse de l’IA (si `VITE_MISTRAL_API_KEY` est configurée). |
| **Quiz interactif** | En cliquant sur « Quiz » dans le menu, les 4 questions s’enchaînent ; à la fin, une destination est recommandée avec explication. |
| **Animations** | Au scroll, les sections apparaissent en fondu ; au survol des cartes et boutons, les effets (scale, translation) se déclenchent. |

Si un point ne fonctionne pas (ex. chatbot), revérifiez la variable d’environnement dans **Vercel → Project → Settings → Environment Variables**, puis redéployez (**Deployments → … → Redeploy**).

---

## Étape 8 : Tester sur desktop et mobile

### Sur desktop

1. Ouvrez le site dans Chrome, Firefox ou Safari.
2. Testez les liens du header (Accueil, Destinations, Quiz, Contact).
3. Scrollez toute la page (Hero → Destinations → Quiz → Footer).
4. Survolez les cartes et les boutons pour voir les animations.
5. Ouvrez le chatbot, envoyez un message et vérifiez la réponse.
6. Faites le quiz de bout en bout et vérifiez le résultat.

### Sur mobile

1. Sur votre téléphone, ouvrez l’URL du site (ou scannez un QR code si vous en générez un).
2. Vérifiez que le **menu burger** (icône ☰) s’ouvre et que les liens fonctionnent.
3. Vérifiez que la **vidéo Hero** se lance (ou le fallback).
4. Vérifiez que les **cartes** sont lisibles et que les boutons sont bien cliquables.
5. Ouvrez le **chatbot** et envoyez un message.
6. Faites le **quiz** (questions et résultat).

En cas de souci (vidéo qui ne charge pas, chatbot qui ne répond pas), vérifiez la connexion et, pour le chatbot, la présence de `VITE_MISTRAL_API_KEY` sur Vercel.

---

## Déploiements automatiques après chaque push

Une fois le projet importé :

- Chaque **push sur la branche `main`** déclenche un nouveau déploiement.
- Chaque **pull request** peut avoir une **URL de prévisualisation** pour tester avant de fusionner.

Vous n’avez rien à refaire manuellement : poussez votre code sur GitHub et Vercel met à jour le site.

---

## Récapitulatif

| Étape | Action |
|-------|--------|
| 1 | Créer un compte Vercel (avec GitHub) |
| 2 | Mettre le projet sur GitHub |
| 3 | Importer le repo dans Vercel (Add New → Project) |
| 4 | Laisser la config auto Vite/React |
| 5 | Ajouter `VITE_MISTRAL_API_KEY` dans Environment Variables |
| 6 | Cliquer sur Deploy |
| 7 | Vérifier Hero, cartes, chatbot, quiz, animations |
| 8 | Tester sur desktop et mobile |

Votre webapp **TimeTravel Agency** est alors en ligne et utilisable par tout le monde.
