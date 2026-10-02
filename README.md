# MovieVerse

MovieVerse est une application web React permettant de découvrir les films tendance via l'API publique [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Installation

### Prérequis

- Node.js 18 ou version supérieure
- npm
- Une clé API TMDB ou un jeton d'accès en lecture TMDB

### Installer le projet

Depuis le dossier du projet, installez les dépendances :

```bash
npm install
```

## Configuration de l'API TMDB

1. Copiez le fichier `.env.example` et créez un fichier `.env` à la racine du projet :

```bash
copy .env.example .env
```

Sur macOS ou Linux :

```bash
cp .env.example .env
```

2. Ouvrez `.env` et renseignez vos identifiants TMDB :

```env
VITE_TMDB_API_KEY=votre_cle_api_tmdb
VITE_TMDB_ACCESS_TOKEN=votre_jeton_d_acces_en_lecture_tmdb
```

`VITE_TMDB_ACCESS_TOKEN` est utilisé en priorité avec une authentification Bearer. `VITE_TMDB_API_KEY` est utilisé comme solution de repli si aucun jeton de lecture n'est fourni.



## Commandes de lancement

### Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera généralement accessible à l'adresse :

```text
http://localhost:5173
```

### Résoudre l'erreur PowerShell `npm.ps1`

Si PowerShell affiche l'erreur `l'exécution de scripts est désactivée sur ce système`, utilisez directement la version Windows de npm :

```powershell
npm.cmd run dev
```

Cette variante permet de lancer le projet sans modifier la politique de sécurité PowerShell.

Vous pouvez aussi autoriser les scripts locaux uniquement pour votre compte Windows :

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Confirmez avec `O`, fermez puis rouvrez PowerShell, et relancez :

```powershell
npm run dev
```

### Construire l'application pour la production

```bash
npm run build
```

Les fichiers générés sont placés dans le dossier `dist/`.

### Prévisualiser le build de production

```bash
npm run preview
```

## Fonctionnalités principales

- Films tendance du jour
- Recherche de films avec debounce
- Tri par popularité, note et date de sortie
- Page de détails d'un film
- Gestion des favoris avec persistance dans `localStorage`
- Mode clair/sombre persistant
- Interface responsive avec Tailwind CSS

## Démo en ligne (Vercel):
https://movie-verse-blue-phi.vercel.app/