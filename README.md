# Fake Store API front-end (projet

## Description

Cette application web front-end consomme la [Fake Store API](https://fakestoreapi.com/) pour afficher et gérer des produits fictifs.  
Le but est de démontrer l’utilisation d’une API REST et la manipulation dynamique du DOM avec JavaScript.

Fonctionnalités principales :  

- Affichage des produits avec pagination (“Charger plus”)  
- Ajout d’un produit via un formulaire (`POST`)  
- Modification d’un produit existant via le même formulaire (`PUT`)  
- Mise à jour instantanée des produits dans le DOM  

> ⚠️ La Fake Store API étant une API de test, les opérations `POST` et `PUT` **ne sont pas persistées côté serveur**. Les changements sont donc appliqués **directement en front-end** pour que l’interface reflète les actions de l’utilisateur.

---

## Fonctionnalités détaillées

1. **Affichage des produits**  
   - Produits affichés par paquets de 4  
   - Bouton “Charger plus” pour récupérer les produits suivants  
   - Cartes uniformisées en taille et style avec CSS  
   - Descriptions longues tronquées avec `…` pour garder un rendu cohérent  

2. **Ajouter un produit (`POST`)**  
   - Formulaire pour créer un produit  
   - Le nouvel article est ajouté directement au DOM  

3. **Modifier un produit (`PUT`)**  
   - Même formulaire utilisé pour modifier un produit existant  
   - Mise à jour immédiate du DOM après modification  

4. **Gestion dynamique du formulaire**  
   - Adaptation automatique du formulaire selon l’action (ajout ou modification)  
   - Les listeners sont gérés pour éviter les conflits ou doublons  

---

## Technologies utilisées

- HTML / CSS  
- JavaScript (Vanilla JS, manipulation du DOM, Fetch API)  
- Fake Store API (REST API publique pour tester des produits fictifs)  

---

## README FAIT AVEC CHATGPT


