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

CREATE TABLE users (
    id  SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);