# PERN stack set up guide

#### Using Vite React app

## Basic project structure

1. Create git repo and clone to your local repo.
2. Cd into your root directory and ake server and client folders:
   ```
   mkdir server
   mkdir client
   ```
3. Cd into server folder and initilaise NPM and install dependancies:
   ```
   npm init -y
   npm i express body-parser pg dotenv morgan debug
   ```
4. In the generated package.json file, configure debug, ES6 modules, and nodemon config:
   ```
   {
       "name": "project-name",
       "version": "1.0.0",
       "description": "",
       "main": "app.js",
       "type": "module",
       "scripts": {
           "start": "set DEBUG=app & nodemon server.js",
           "debug": "set DEBUG=* & nodemon server.js",
           "test": "echo \"Error: no test specified\" && exit 1"
       },
       "keywords": [],
       "author": "",
       "license": "ISC",
       "dependencies": {
           "body-parser": "^1.20.2",
           "debug": "^4.3.4",
           "dotenv": "^16.3.1",
           "express": "^4.18.2",
           "morgan": "^1.10.0"
       },
       "nodemonConfig": {
           "restartable": "rs",
           "delay": 2500
       }
   }
   ```
5. Create the "src" folder: `mkdir src`
6. Create "server.js": `touch server.js`
7. Create a simple node/express server in server.js:

   ```
    import express from 'express';
    import bodyParser from 'body-parser';
    import morgan from 'morgan';
    import debug from 'debug';
    import dotenv from 'dotenv';

    // Configure environment variables
    dotenv.config({ path: './config/.env' });

    // Create express app
    const app = express();

    // Server config goes here
    const PORT = process.env.PORT || 3000;

    // Middleware
    app.use(express.json());
    app.use(morgan('dev'));

    // Test route
    app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
    });

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
   ```

8. Return to the project root: `cd ..`
9. Create Vite React app: `npm create vite@latest`
10. When prompted name the project 'client'
11. Run:

    ```
    cd client
    npm i
    ```

12. Install and config eslint as dev dependancies:

    ```
    npm i --save-dev vite-plugin-eslint eslint-config-react-app eslint
    ```

13. Modify Vite config for eslint and to proxy API requests:

    ```
    import eslint from 'vite-plugin-eslint';

    // https://vitejs.dev/config/
    export default defineConfig({
        plugins: [react(), eslint()],
        server: {
            proxy: {
            '/api': 'http://localhost:3000',
            },
        },
    });
    ```

14. Remove unnecessary files created by Vite so you are left with only "App.jsx" and "main.jsx".
15. Open "App.jsx" and delete everything. THen use the "rfc" snippet to create a new App component.
16. Create the rest of the client application structure:
    ```
    cd src/
    mkdir data features hooks pages services styles ui utils
    ```

The basic project structure is now set up.

## Setting up Styled Components

1. In the "client" directory, install "styled-components":
   ```
   npm i styled-components
   ```
2. Set up your global styles:
   1. Create the file:
    ```
    cd styles/
    touch GlobalStyles.js
    ```
   2. In the file, create the "createGlobalStyles" object:
   ```
   import { createGlobalStyle } from "styled-components";

    createGlobalStyle`

    `
   ```
   3. Create your global styles within the template literal.

