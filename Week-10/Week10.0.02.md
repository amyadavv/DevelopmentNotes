# ORMS and Prisma

Problems using raw sql queries ?

1. You have to write raw sql queries
2. Migrations are hard
3. You don't get the best types

Solutions - ORMs

ORM - Object relation model

Prisma - It is next generation Node.js and typescript ORM. Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety and auto-completion.

# How to choose a library?

1. Popularity
2. Repo activity
3. Support
4. Maturity and stability

# Prisma Libraries

1. Prisma Client : Auto-generated and type-safe query builder for node.js and typescript. 
2. Prisma Migrate: Migration tool to easily evolve your database schema from prototyping to production. If we change database schema ever it will create migration files that we can simply run on the production database we don't have to manually go to the production database and write queries. Whenever we want to add new table we added some where in prisma and prisma takes care of creating these queries you run a single command it apply those to our database. 
3. Prisma Studio: GUI to view and edit data in your database. Similar to mongoDB compass.

# Automated Migrations?

DB changes often, you add more columns, add new tables, you have to do MIGRATIONS to keep syncing the DB state. 

Pre ORM days - Manually update the prod DB, dev DB. 

There was no log of the changes made to the DB. 

ORM - It maintains a very nice log of your database, how it is changed overtime and we have to run a single command it will apply migrations on it. 

Note: Big thing to note - You need full access of postgres for the to work. You can either run it locally or buy a full db.


