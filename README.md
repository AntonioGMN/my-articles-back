## Implemented features:

- [x] Sign-up, log-in, and logout
- [x] Get and create articles by link
- [x] Get articles by crawller
- [x] Edite articles

## Technologies

<p>
   <img alt="nestjs" src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white"/>
  <img alt="node" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="jwt" src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>
  <img alt="mysql" src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img alt="typecript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="jest" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img alt="eslinter" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"/>

</p>

## How to run

### Clone this repository

```bash
$ git clone https://github.com/AntonioGMN/teste-IN8-back.git
```

### 1- Access the directory where you cloned it

```bash
$ cd teste-in8-back
```

### 2- Install back-end dependencies

```bash
npm i
```

### 3- Create an environment variables file in the project root (.env) and configure it as shown in .env.example file:

```bash
NODE_ENV = development

DB_HOST = localhost
DB_PORT = 3306
DB_USERNAME = root
DB_PASSWORD = Senha1123456@
DB_DATABASE = in8database

JWT_SECRETE = MEGASENHA
```

### 4- Create a database mysql with the same name then DB_DATABASE on for env file

### 5- Run the back-end with

```bash
npm run start:dev
```

## How to Test

### Create an environment variables file in the project root (.env.test), set NODE_ENV = test and configure it as shown in .env.example file:

```bash
NODE_ENV = test

DB_HOST = localhost
DB_PORT = 3306
DB_USERNAME = root
DB_PASSWORD = Senha123456@
DB_DATABASE = in8databasetest

JWT_SECRETE = MEGASENHA
```

### Run the test with

```bash
npm run test:e2e
```
