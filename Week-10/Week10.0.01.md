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

Example - 

```jsx 

async function createTable() {
    const client await getClient();
    const createUse TableQuery = `
        CREATE TABLE users ( 
            id SERIAL PRIMARY KEY, 
            email VARCHAR(255) UNIQUE NOT NULL, 
            password VARCHAR(255) NOT NULL 
            );
    `;

    await client.query(createUserTableQuery);

    const createTodosQuery = `
        CREATE TABLE todos (   
            id SERIAL PRIMARY KEY, 
            title TEXT NOT NULL, 
            description TEXT, 
            user_id INTEGER REFERENCES users(id), 
            done BOOLEAN DEFAULT FALSE 
        );
    `;    

await client.query(createTodosQuery);

console.log("Table created successfully!");

}

```

utils.ts (connection) - 

```jsx 

import { Client } from 'pg';

export async function getClient () {
    const client = new client ("connection string");
    await client.connect();
    return client;
}

```

# Insert 

Insert commands: 

1. INSERT INTO todos, (title, description, user_id, done) 
   VALUES ('Buy groceries', 'Milk, bread, and eggs', 1, FALSE);

2. INSERT INTO users (username, email, password) 
   VALUES ('amyadavv', 'amyadav319@gmail.com', 'hashed_password');


- If you try to insert a todo and put user_id in the INSERT command that does not exists in the users table then the INSERT command will give error. Because todos table have very strict schema that whenever we add a todo and in the INSERT command there should be a user_id which have a entry in the users table. It won't let you do insert unless there is a entry in a users table. 
- Similarly if you try to delete a user who has a bunch of todos it will complain that there are some todos already for this user,  first delete those todos only then you can delete the user. That is the benefit that REFERENCE provide 

Example - 

```jsx 

import { getClient } from "./utils";

async function createEntries() {
    const client = await getClient();
    const insertUserText = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id';
    const userValues = ['amyadav@gamil.com', 'hashed_password'];

    let response = await client.query(insertUserText, userValues);

    const insertTodoText = 'INSERT INTO users (title, description, user_id, done) VALUES ('$1', '$2', '$3', '$4') RETURNING id';
    const todoValues = ['Buy groceries', 'Milk, bread, and eggs', response.rows[0].id, false];
    await client.query(insertTodoText, todoValues);

    console.log("Entries created!");
}

```

RETURNING id - means after the query is done return me the ID of the new user that is created we can also return other values such as 'email' or use '*' which gives you everything.

Question - Why are we using userValues separately why can't we just add email and password directly in the insertUserText in place of $1 $2?

The reason is sql injection. We can totally do this - INSERT INTO users (email, password) VALUES ("amyadav@gamil.com", "hashed_password") RETURNING id; but the problem is email and password we get from the user from frontend, user can simply write something bad here - INSERT INTO users (email, password) VALUES ("amyadav@gamil.com AND DROP TABLE users;", "hashed_password") and if we send this query to the database so it will drop/delete user table. So in sql injection we letting users inject SQL into our backend which is why, the standard way to fix it is to put this "$1 $2" variable templates here and the values of this templates are 'userValues'. So if the users send you the ("amyadav@gamil.com AND DROP TABLE users;", "hashed_password") so it is as such stored in the database. So whatever here in the 'userValues' does not got executed, its upfront a value that means it will go as such in the database. 

# Gets

SELECT * FROM todos WHERE user_id = desired_user_id;

Code: 

```jsx

async function getTodosForUser (userId: number) {
    const client = await getClient;

    const selectTodosText = 'SELECT * FROM todos WHERE user_id = $1';
    const todoRes = await client.query(selectTodosText, [userId]);

    console.log(`Todos for User ID ${userId}:`);
    for(let todo of todoRes.rows) {
        console.log(`ID : ${todo.id}, Title: ${todo.tile}, Description: ${todo.description}, Done: ${todo.done}`);
    }
}

```

# Updates 

``` jsx

import { getClient } from "./utils";

async function updateTodo (todoId: number) {
    const client = await getClient();

    const updateTodoText = 'UPDATE todos SET done = $1 WHERE id = $2';
    await client.query(updateTodoText, [true  , todoId]);

    console.log(`Todo with ID ${todoId} updated to not done!`);
}

const todoIdToUpdate = 3;
updateTodo(todoIdToUpdate);

```

# Delete 

DELETE FROM todos WHERE id = id;

``` jsx

async function deleteTodo (todoId: number) {
    const client = await getClient();
    const deleteTodoText = 'DELETE FROM todos WHERE id = $1';
    await client.query(deleteTodoText, [todoId]);

    console.log(`Todo with ID ${todoId} deleted`);
}

```

# DROP

DROP TABLE IF EXISTS todos;
