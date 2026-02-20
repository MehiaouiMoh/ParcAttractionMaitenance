# Améliorations possibles (techniques et fonctionnelles)

Ce document liste des améliorations, priorités et estimation en jours-homme.

## Sécurité (haute priorité)
- Hasher les mots de passe et ne plus stocker en clair (bcrypt) — 1 à 2 jours.
- Stocker la clé JWT et les identifiants DB dans des variables d'environnement / secret manager — 0.5 à 1 jour.
- Forcer HTTPS, sécuriser les entêtes HTTP (HSTS, CSP) dans Nginx — 1 jour.

## Auth et gestion des utilisateurs
- Introduire rôles (admin / modérateur / visiteur) + middlewares de contrôle d'accès — 2 à 3 jours.
- Renouvellement et révocation de token (Blacklisting ou refresh tokens) — 2 jours.

## Qualité du code & CI/CD
- Ajouter tests unitaires backend (pytest) et tests d'intégration — 3 à 5 jours.
- Pipeline CI (build, lint, tests, scan vulnérabilités) — 2 à 3 jours.

## Base de données & migrations
- Ajouter migrations (Alembic / Flyway) et scripts de seed — 1 à 2 jours.
- Migrer vers modèles avec contraintes (FK) si nécessaire — 1 à 2 jours.

## Fiabilité & observation
- Metrics + monitoring (Prometheus + Grafana) et logs structurés (ELK ou Azure Monitor) — 3 jours.
- Ajouter gestion des erreurs centralisée et Sentry pour tracking des exceptions — 1 jour.

## Performances
- Pagination et filtres côté API pour listes (limit/offset) — 1 jour.
- Indexation DB additionnelle selon requêtes réelles — 0.5 jour.

## Frontend / UX (fonctionnel)
- Améliorer l'interface d'administration (table avec tri/filtre, pagination) — 3 à 5 jours.
- Ajouter recherche d'attraction, filtrage par difficulté, note moyenne — 2 à 3 jours.
- Confirmation / modération des messages (workflow) — 2 jours.

## Déploiement / infra
- Séparer services en environnements (dev/staging/prod), IaC pour provisioning (Terraform/Bicep) — 3 à 5 jours.
- Mettre en place tests e2e et déploiement continu automatique — 3 à 5 jours.

## Estimation globale (par lots)
- Corrections / sécurité critiques : ~5 à 8 jours
- Tests + CI/CD : ~5 à 8 jours
- Frontend feature set (UX) : ~5 à 10 jours
- Observabilité + infra : ~4 à 8 jours

Remarque : les estimations sont données pour une personne à temps plein et peuvent varier selon les spécifications détaillées.
