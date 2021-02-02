# Test technique Guidap API

## Technos utilisées

- Typescript
- Express
- TypeORM
- MySQL (j'aurais pu choisir PostgreSQL mais je connaissais mieux MySQL)
- ESLint

## Etapes pour run le projet

1. Créer une base de données MySQL du nom de *Guidap*
2. `npm i`
3. Définir les paramètres de base de données et d'APIs (Mapbox, OpenWeather) dans le fichier `.env_template`
4. Renommer `.env_template` en `.env`
5. Au premier lancement:
   1. Décommenter dans `server.ts` tout ce qui concerne la fonction *Bootstrap()* afin d'initialiser un set de données
   2. Lancer la commande `npm run dev`
6. Au deuxième lancement:
   1. Recommenter dans `server.ts` tout ce qui concerne la fonction *Bootstrap()*
   2. Lancer la commande `npm run dev`
