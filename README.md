## Hasura-User-CRUD API

Simple CRUD NodeJS Backend (User Registration, Login, Deletion - name, Username and Password as inputs)

# Prerequisites

What things you need to install the software and how to install them

- Node : https://nodejs.org/en/download/
- npm

# How to Run the application

    * Install hasura-cli
      ```
      npm install --global hasura-cli
      ```
    * Start Hasura and Postgres
      ```
      docker-compose up -d
      ```
    * Apply Migrations
      ```
      1. cd hasura
      2. hasura migrate apply
      3. hasura metadata apply
      ```
    * Run Node Express App
      ```
      1. cd ../node-express
      2. npm install
      3. npm start
      ```

# Your API should allow users:

- To register

````
 mutation {
     signup(username:"xyz", name:"xyz", password: "xyz"){
         id
         token
     }
 }
 ```
* To Login
````

    query {
        login(username:"xyz", password: "xyz"){
            id
            accessToken
        }
    }

````
* To Delete
    ```
    mutation {
        delete_by_username(username:"xyz"){
        id
        username
        }
    }
    ```
````
