# Documentation Fonctionnelle

## But de l'application
Permettre la gestion et la consultation des attractions d'un parc ainsi que la collecte d'avis/messages des visiteurs.

## Utilisateurs et rôles
- Visiteur : peut lister les attractions visibles, consulter les détails et poster un message.
- Admin : peut se connecter, lister toutes les attractions (visibles ou non), ajouter/modifier/supprimer des attractions.

## Scénarios d'utilisation principaux
- Consulter la liste des attractions : navigation depuis la page d'accueil vers la section Attractions.
- Voir le détail d'une attraction : cliquer sur une attraction dans la liste.
- Poster un message/avis : remplir le formulaire "contact/avis" (nom, prénom, message, note facultative) et envoyer.
- Authentification admin : via la page de login ; après `POST /login` le front stocke le token et le joint aux requêtes protégées.
- Administration des attractions : interface admin (CRUD) utilisant `POST /attraction` et `DELETE /attraction/<id>`.

## Points UX / navigation (code existant)
- Composants Angular principaux : `accueil`, `admin`, `attractions`, `login`, `messages`.
- Services Angular se trouvent dans `parc/src/app/Service/` (ex. `attraction.service.ts`, `auth.service.ts`, `message.service.ts`) et appellent l'API Flask.

## Données d'initialisation utiles
- Un compte test existe dans `python/sql_file/create.sql` : `toto` / `toto`.
