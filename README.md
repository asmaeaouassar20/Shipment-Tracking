# Real-Time Shipment Tracking
- Application full-stack dédiée à la gestion et au suivi des expéditions (shipments).
- L’application permet de créer, consulter et mettre à jour des expéditions tout en offrant une mise à jour en temps réel de leur statut grâce aux WebSockets.
- Le projet est composé d'un backend Spring Boot exposant une API REST et d'un frontend Angular permettant aux utilisateurs d'interagir avec les données via une interface web moderne et responsive
- L'application utilise WebSocket + STOMP afin de diffuser les changements de statut aux clients connectés.

## Fonctionnalités
- Création d'une expédition
- Consultation de toutes les expéditions
- Mise à jour du statut d'une expédition
- Notifications en temps réel

## Architecture

Le projet suit une architecture séparant le frontend et le backend.

                    ┌──────────────────────┐
                    │      Angular UI      │
                    │                      │
                    │  Shipment Component  │
                    │  Notification        │
                    │  Theme Management    │
                    └──────────┬───────────┘
                               │
                    REST API   │   WebSocket / STOMP
                               │
                 ┌─────────────▼─────────────┐
                 │       Spring Boot         │
                 │                           │
                 │      Controllers          │
                 │          │                │
                 │       Services            │
                 │          │                │
                 │     Repositories          │
                 │          │                │
                 │        Database           │
                 └───────────────────────────┘

## Technologies utilisées
Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- WebSocket
- STOMP
- Lombok
- Swagger / OpenAPI
<br/>

Frontend
- TypeScript
- Angular
- HTML / CSS
- Bootstrap
<br/>

Architecture & communication
- REST API
- WebSocket
- STOMP
  


## Fonctionnement du temps réel
Le système utilise les WebSockets pour permettre au backend de communiquer directement avec les clients connectés.  

Lorsqu'une expédition est créée ou que son statut est modifié :
- Le backend traite la modification.
- Un événement est généré.
- Le changement est diffusé via WebSocket.
- Les clients connectés reçoivent la notification en temps réel.
- L'interface utilisateur est automatiquement mise à jour.

<br/>

**Exemple**

- Un utilisateur modifie le statut d'une expédition :
  

PENDING  -->  (Update) -->  IN_TRANSIT  -->  (WebSocket) -->  Connected Angular Clients -->  Notification displayed


- Cette approche permet d'éviter que le frontend ait besoin d'interroger régulièrement le backend pour vérifier si le statut a changé.




<br/><br/>

# Installation
## Prérequis
- Java
- Maven
- Node.js
- npm
- Angular CLI





<br/><br/>


# API REST

GET	/shipments	Récupérer tous les shipments
GET	/shipments/{id}	Récupérer un shipment par ID
GET	/shipments/tracking/{trackingNumber}	Rechercher par tracking number
POST	/shipments	Créer un shipment
PATCH	/shipments/{id}/status	Modifier le statut



<br/><br/>

# API Documentation

L'API peut être explorée à l'aide de Swagger/OpenAPI lorsque le serveur backend est démarré. <a href="http://localhost:8080/swagger-ui/index.html" >http://localhost:8080/swagger-ui/index.html</a>

<hr/>

<br/><br/>
# Objectifs du projet

Ce projet a notamment pour objectif de mettre en pratique :

- Le développement d'une API REST avec Spring Boot-
- utilisation des DTO
- L'architecture Controller / Service / Repository
- La gestion des exceptions
- La documentation d'API avec Swagger
- La communication temps réel avec WebSocket
- L'utilisation de STOMP
- Le développement d'une interface Angular
- La communication Angular ↔ Spring Boot
- La gestion des notifications temps réel
- La création d'une interface responsive
- La gestion Light / Dark Mode
