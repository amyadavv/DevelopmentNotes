# Postgresql

1. SQL - Strict schemas. Very hard to change schemas, involve migrations

2. NoSQL - Schemaless. Faster to produce apps 


Relationships - You break data into multiple table and these table some how related with each other.

## Types of SQL Databases 

1. Postgres 
2. MySQL

# Basic types of queries 

1. Insert 
2. Update
3. Delete
4. Get

# pg Library 

Create an empty Nods.js Project. Install pg (Think of it as mongoose for Postgres)

npm install pg
npm install @types/pg

# Create Table

1. CREATE TABLE users (
    id  SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

- We need to tell postgres that this is our database looks like. Biggest difference between sql and no sql databases is before you started to write you applications you have to tell postgres that this is a new table this is what it looks like, it is different from mongo where we put whatever data we want and it never worried about the schema. In place of SQL we have to tell these are my fields these are what they look like before you do any insert operations, get operations, update operations we need to tell postgres this is my schema of my database.

- There are multiple ways to create string in postgres/sql and VARCHAR(255) (character length of 255) is the most popular one. 

2. CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    user_id INTEGER REFERENCE users(id),
    done BOOLEAN DEFAULT FALSE 
)

- We can use text here, TEXT has no limit of how long it can be but VARCHAR has limit
- BOOLEAN means we need to put true or false value in it
- DEFAULT means there will be always a default value in the row, it does not matter weather the user provide the row value or not. In this case it will be FALSE by DEFAULT. 
- user_id is a foreign key, and this foreign key is the primary key in the users table REFERENCE means it reference to the user table id. This means that this todos table is related to the users table by user_id as a foreign key and INTEGER means it will be a number. 

