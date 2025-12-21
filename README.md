# 🗂️ Project Manager – MongoDB & TypeScript

Mini application backend de gestion de projets et de tâches (type Trello simplifié), développée **sans Mongoose**, avec le **driver MongoDB officiel** et **TypeScript**.

Objectif : pratiquer MongoDB “à la main” (ObjectId, références, indexes, aggregations) dans une architecture backend propre.

---

## 🧱 Stack
- Node.js
- Express.js
- MongoDB (driver officiel)
- TypeScript
- (Frontend React optionnel)

---

## 🗃️ Modèle de données (références uniquement)
- **users** → utilisateurs
- **projects** → projets (ownerId)
- **tasks** → tâches (projectId, assignedTo)

---

## ✅ TODO – Avancement du projet

### 🔹 Setup
- ✅ Initialiser le projet Node + TypeScript
- ✅ Configurer Express
- [ ] Connexion MongoDB propre (singleton)
- ✅ Variables d’environnement

---

### 🔹 CRUD de base
- [ ] Créer un utilisateur
- [ ] Créer un projet
- [ ] Créer une tâche
- [ ] Lister les tâches d’un projet
- [ ] Modifier le statut d’une tâche
- [ ] Supprimer une tâche

---

### 🔹 MongoDB avancé
- [ ] Pagination des tâches
- [ ] Index sur `projectId`
- [ ] Aggregation : nombre de tâches par status
- [ ] Aggregation : projets avec nombre total de tâches
- [ ] `$lookup` : tâche + utilisateur assigné

---

### 🔹 Qualité & propreté
- [ ] Validation manuelle des données
- [ ] Types TypeScript stricts
- [ ] Gestion centralisée des erreurs
- [ ] Séparation routes / controllers / services

---

## 🎯 Objectif final
Être à l’aise avec **MongoDB sans ORM**, capable de concevoir, interroger et maintenir une base MongoDB en conditions réelles.

## Ce que j'ai appris jusqu'à maintenant :
- La différence entre un service et un controller.
- La création d'index avec node.js
- les avantages (et les difficultées) d'utiliser typescript
