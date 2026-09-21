# Types of Databases

There are a few types of databases, all service different types of use-cases

## NoSQL databases

1. Store data in a schema-less fashion. Extremely lean and fast way to store data. 
2. Examples - MongoDB

## Graph database 

1. Data is stored in the Data is stored in the form of a graph. Specially useful in cases where relationships need to be stored (social networks).
2. Examples - Neo4j
 

## Vector databases

1. Stores data in the form of vectors
2. Useful in Machine learning
3. Examples - Pinecone

## SQL databases

1. Stores data in the form of rows
2. Most full stack applications will use this. And its very strict. 
3. Examples - MySQL, Postgres
4. We store data is rows and data is string, number, boolean, we usually don't store JSON or array  in SQL db, there are ways to do it but in SQL we don't do it. 

# Why not NoSQL 

1. You might’ve used MongoDB. 
2. It’s schemaless properties make it ideal to for bootstrapping a project fast.
3. But as your app grows, this property makes it very easy for data to get corrupted.
 
## What is schemaless?

Different rows can have different schema (keys/types)


## Problems?

1. Can lead to inconsistent database
2. Can cause runtime errors 
3. Is too flexible for an app that needs strictness
 
## Upsides?

1. Can move very fast
2. Can change schema very easily
 
You might think that mongoose does add strictness to the codebase because we used to define a schema there. 
That strictness is present at the Node.js level, not at the DB level. You can still put in erroneous data in the database that doesn’t follow that schema.

# Why SQL?
 
SQL databases have a strict schema. They require you to

1. Define your schema
2. Put in data that follows that schema
3. Update the schema as your app changes and perform migrations
 
So there are 4 parts when using an SQL database (not connecting it to Node.js, just running it and putting data in it)

1. Running the database.
2. Using a library that let’s you connect and put data in it.
3. Creating a table and defining it’s schema.
4. Run queries on the database to interact with the data (Insert/Update/Delete)
 

Connection string - postgresql://neondb_owner:npg_aCr6N4DRdSzo@ep-broad-truth-b4zh4qvq-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Using a library that let’s you connect and put data in it

1. psql - psql is a terminal-based front-end to PostgreSQL. It provides an interactive command-line interface to the PostgreSQL (or TimescaleDB) database. With psql, you can type in queries interactively, issue them to PostgreSQL, and see the query results.
How to connect to your database?
psql Comes bundled with postgresql. You don’t need it for this tutorial. We will directly be communicating with the database from Node.js
psql -h p-broken-frost-69135494.us-east-2.aws.neon.tech -d database1 -U 100xdevs

 
2. pg - pg is a Node.js library that you can use in your backend app to store data in the Postgres DB (similar to mongoose). We will be installing this eventually in our app.