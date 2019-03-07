# Team WhiteSky
Foxycle

## Instructions for running this application:

1. run `git clone git@github.com:CSC307Winter2019/Group3.git`

2. navigate to that newly created directory

3. Create a file called `config.json` in `/api` with this content:

 ```
 {
  "dev": {
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "dev",
    "logging": true
  },
  "test": {
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "test"
  }
}
```

4. In MySQL in VSCode, run a SQL query to create a database `dev` and `test`

  ``` 
  create database dev
  
  create database test 
  ```

5. run `npm i` in the api/ and client/ directories

6. run `docker-compose up` in the top level directory

7. run `npm run start` in the api/ directory

8. run `npm run serve` in the client/ directory

9. Query the `dev` database with the contents of `data.sql` in the root directory

10. In your browser, navigate to `localhost:8080`

---

## Login Info

#### Admin
* username: admin
* password: admin
#### Employee
* username: a 
* password: a

## Team Members:
* Ishaan Jain - Team Lead
* Evan Zhang - Architect
* Abhijeet Sidhu - DB Lead
* Garrett Wayne - UI Lead
