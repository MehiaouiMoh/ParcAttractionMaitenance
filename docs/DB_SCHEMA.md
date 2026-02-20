# Schéma de Base de Données

Ce document résume les tables créées par `python/sql_file/init.sql` et les données d'exemple de `python/sql_file/create.sql`.

## Tables

1) `attraction`
- `attraction_id` : INT AUTO_INCREMENT — clé primaire
- `nom` : VARCHAR(255) NOT NULL
- `description` : VARCHAR(255) NOT NULL
- `difficulte` : INT
- `visible` : BOOL DEFAULT TRUE

2) `users`
- `users_id` : INT AUTO_INCREMENT — clé primaire
- `name` : VARCHAR(255) NOT NULL
- `password` : VARCHAR(255) NOT NULL  (actuellement en clair)

3) `messages`
- `message_id` : INT AUTO_INCREMENT — clé primaire
- `nom` : VARCHAR(255)
- `prenom` : VARCHAR(255)
- `message` : VARCHAR(255) NOT NULL
- `note_attraction` : INT

## Index & contraintes
- Aucune contrainte d'intégrité référentielle (FK) n'est définie dans les scripts fournis.
- Préconisation : ajouter des index sur `attraction.visible` et sur `users.name` pour accélérer les recherches.

## Données d'exemple (extraits de `create.sql`)
- Attraits insérés : `Silver Star`, `Montagne 8`, `Goudurix` (avec visibilité et difficulté).
- Utilisateurs : un utilisateur `toto` / `toto` pour tests.

## Recommandations pour le schéma
- Hash des mots de passe (`bcrypt`) et stockage du `salt` implicite.
- Ajouter table `roles` et liaison `users_roles` si gestion multi-rôles souhaitée.
- Ajouter contraintes `NOT NULL` / valeurs par défaut plus strictes si requis.
- Introduire migrations (Alembic ou équivalent) pour versionner l'évolution du schéma.
