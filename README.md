# Correction du TP Noté : Création d'une API RESTful pour un Système de Devoirs

## Objectif

Ce projet consiste à créer une API RESTful avec Node.js et Express pour la gestion d'un système de devoirs. Cette API permet de créer, lire, mettre à jour et supprimer des devoirs tout en intégrant une authentification via JSON Web Tokens (JWT). L'API est conçue pour être compatible avec Retool et permet une gestion simple des devoirs.

## Prérequis

Assurez-vous d'avoir les outils suivants installés sur votre machine :
- Node.js
- MySQL
- pnpm (installer avec `npm install -g pnpm` si ce n'est pas déjà fait)

Vérifiez les versions avec les commandes suivantes :

\```bash
node -v
mysql -V
pnpm -v
\```

## Configuration de la Base de Données MySQL

Créez une base de données MySQL et une table `devoir` avec les champs requis :

\```sql
CREATE DATABASE devoirs;
USE devoirs;
CREATE TABLE devoir (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  date_debut DATE,
  date_rendu DATE,
  matiere VARCHAR(255),
  professeur VARCHAR(255)
);
\```

## Installation

1. Clonez le dépôt et accédez au dossier du projet :

    \```bash
    git clone <url-du-depot>
    cd api-devoirs
    \```

2. Initialisez le projet avec **pnpm** et installez les dépendances :

    \```bash
    pnpm init -y
    pnpm add express mysql cors jsonwebtoken bcrypt dotenv
    \```

3. Créez un fichier `.env` à la racine du projet avec les informations suivantes :

    \```env
    SECRET_KEY=yourSecretKey
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=password
    DB_NAME=devoirs
    \```

## Démarrage du Serveur

Lancez le serveur avec la commande suivante :

\```bash
pnpm node app.js
\```

Le serveur devrait démarrer à l'adresse `http://localhost:3000/`.

## Structure de l'API

### Endpoints

- **POST /register** : Crée un nouvel utilisateur.
- **POST /login** : Authentifie un utilisateur et renvoie un token JWT.
- **GET /devoirs** : Récupère tous les devoirs (nécessite un token JWT).
- **POST /devoirs** : Crée un nouveau devoir (nécessite un token JWT).
- **PUT /devoirs/:id** : Met à jour un devoir existant (nécessite un token JWT).
- **DELETE /devoirs/:id** : Supprime un devoir (nécessite un token JWT).

### Exemple de JSON pour Ajouter un Devoir

\```json
{
  "nom": "Devoir de Mathématiques",
  "description": "Résoudre les exercices du chapitre 3",
  "date_debut": "2024-08-01",
  "date_rendu": "2024-08-10",
  "matiere": "Mathématiques",
  "professeur": "M. Dupont"
}
\```

## Tests des Routes avec Postman

Pour tester les routes de l'API, utilisez [Postman](https://www.postman.com/) :

1. **POST /register** : Créez un nouvel utilisateur avec `username` et `password`.
2. **POST /login** : Authentifiez-vous pour obtenir un token JWT.
3. Ajoutez le token JWT dans le header `Authorization` (ex. : `Bearer <token>`) pour les routes suivantes :
   - **GET /devoirs** : Récupérez tous les devoirs.
   - **POST /devoirs** : Ajoutez un nouveau devoir.
   - **PUT /devoirs/:id** : Mettez à jour un devoir.
   - **DELETE /devoirs/:id** : Supprimez un devoir.

## Critères d'Évaluation

- Fonctionnalité complète de l'API (routes CRUD, authentification JWT, gestion des CORS).
- Structure et organisation du code.
- Utilisation correcte des variables d'environnement.
- Documentation et clarté des commentaires dans le code.
