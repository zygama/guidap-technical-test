# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

## Installation de MySQL

1. Se rendre sur `https://dev.mysql.com/downloads/mysql/#downloads` et télécharger la bonne version en fonction de votre OS (Pour Windows la version MSI Installer).
2. Une fois installé séléctionnez votre port et vos identifiants et notez les (ils seront importants)
3. Ajouter la commande mysql au Path (sur Windows en fonction du lieu d'installation: set PATH=%PATH%;C:\"Program Files"\MySQL\"MySQL Server 8.0"\bin)
4. S'identifier auprès de MySQL avec la commande `mysql -u root -p`
5. Une fois authentifié créer la base de données Guidap avec la commande: `CREATE DATABASE Guidap`
6. Créer les variables d'environnement nécessaires: mysqlUser, mysqlPassword, mysqlPort
7. npm i
8. npm start

* `DROP DATABASE Guidap;`
* `USE Guidap;`
* `SHOW TABLES;`
* `CREATE DATABASE Guidap;`
"# guidap-technical-test" 
