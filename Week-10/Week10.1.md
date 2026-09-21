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

# Creating a table and defining it’s schema.
 
1. Tables in SQL - A single database can have multiple tables inside. Think of them as collections in a MongoDB database.
 
2. Until now, we have a database that we can interact with. The next step in case of postgres is to define the schema of your tables.

3. SQL stands for Structured query language. It is a language in which you can describe what/how you want to put data in the database.

4. To create a table, the command to run is - 
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

## There are a few parts of this SQL statement, let’s decode them one by one

1. CREATE TABLE users
CREATE TABLE users: This command initiates the creation of a new table in the database named users.

2. id SERIAL PRIMARY KEY
- id: The name of the first column in the users table, typically used as a unique identifier for each row (user). Similar to _id in mongodb
- SERIAL: A PostgreSQL-specific data type for creating an auto-incrementing integer. Every time a new row is inserted, this value automatically increments, ensuring each user has a unique id.
- PRIMARY KEY: This constraint specifies that the id column is the primary key for the table, meaning it uniquely identifies each row. Values in this column must be unique and not null.

3. email VARCHAR(255) UNIQUE NOT NULL,
- email: The name of the second column, intended to store the user's username.
- VARCHAR(50): A variable character string data type that can store up to 50 characters. It's used here to limit the length of the username.
- UNIQUE: This constraint ensures that all values in the username column are unique across the table. No two users can have the same username.
- NOT NULL: This constraint prevents null values from being inserted into the username column. Every row must have a username value.

4. password VARCHAR(255) NOT NUL
Same as above, can be non uniqye

5. created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- created_at: The name of the fifth column, intended to store the timestamp when the user was created.
- TIMESTAMP WITH TIME ZONE: This data type stores both a timestamp and a time zone, allowing for the precise tracking of when an event occurred, regardless of the user's or server's time zone.
- DEFAULT CURRENT_TIMESTAMP: This default value automatically sets the created_at column to the date and time at which the row is inserted into the table, using the current timestamp of the database server.


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

Then try running 
\dt;
to see if the table has been created or not