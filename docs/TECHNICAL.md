# Documentation Technique

## Vue d'ensemble
Application en 2 parties :
- Frontend : application Angular (dossier `parc/`) servant l'interface utilisateur.
- Backend : API REST en Flask (dossier `python/`) qui expose les routes pour les attractions, messages et authentification.
- Reverse proxy / SSL : configuration `nginx/` et `docker-compose.yml` pour orchestrer les conteneurs.

Les communications front ↔ back se font via JSON sur des endpoints HTTP exposés par Flask. La base de données utilisée est MariaDB (config dans `python/request/request.py`).

## Structure du dépôt (raccourci)
- `parc/` : code Angular (components, services, routes).
- `python/` : service Flask, controllers, requêtes DB, scripts d'initialisation SQL.
- `sql_file/` : scripts SQL (`init.sql`, `create.sql`).
- `nginx/` : configuration reverse-proxy et certificats.

## Stack technique
- Frontend : Angular (TypeScript, SCSS)
- Backend : Python 3 + Flask, extensions : `flask-cors`, `PyJWT`, `mariadb` client
- DB : MariaDB
- Conteneurisation : Docker, `docker-compose`

## Points d'entrée du backend
- `python/app.py` expose les routes principales :
  - `POST /login` : authentification, retourne un JWT (clé codée en dur actuellement).
  - `GET /attraction` : lister les attractions visibles (pour visiteurs).
  - `GET /attraction/<id>` : détail d'une attraction visible.
  - `POST /attraction` : ajouter / modifier une attraction (requiert token admin).
  - `DELETE /attraction/<id>` : supprimer une attraction (requiert token admin).
  - `GET /attractionAdmin` : lister toutes les attractions (admin, token requis).
  - `GET /messages` : récupérer tous les messages.
  - `POST /messages` : ajouter un message (visiteur).

Les contrôleurs principaux se trouvent dans `python/controller/` :
- `attraction.py` : lecture/écriture/suppression d'attractions via les fonctions `request.request`.
- `messages.py` : lecture/ajout de messages.
- `auth/auth.py` : encodage/décodage JWT et vérification des tokens dans les headers `Authorization`.

## Connexion à la base
La fonction `get_db_connection()` dans `python/request/request.py` utilise les identifiants suivants (actuellement en dur) :

- user: `mysqlusr`
- password: `mysqlpwd`
- host: `database`
- database: `parc`

Toutes les opérations DB passent par des helpers : `insert_in_db`, `select_from_db`, `delete_from_db`, `update_from_db`.

## Sécurité et limites connues (techniques)
- Mots de passe stockés en clair dans la table `users` (cf. `sql_file/create.sql`).
- Clé JWT codée en dur dans le code (`python/controller/auth/auth.py`).
- Pas de validation complète des payloads côté backend (vérifications minimales existantes).
- Requêtes SQL construites avec paramètres pour la plupart des cas, mais `login` utilise une concaténation (risque d'injection si modifié). 
- Pas de gestion des rôles utilisateurs au-delà du token simple.

## Démarrer l'application (raccourci)
- Construire et démarrer :

```bash
docker-compose up --build
```

Ensuite le frontend est servi par le conteneur Angular/nginx (selon config) et l'API Flask sur son conteneur.
