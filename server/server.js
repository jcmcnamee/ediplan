import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import debug from 'debug';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';

// Configure environment variables
dotenv.config({ path: './config/.env' });

// Create express app
const app = express();

// Server config goes here
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your Vite React app's localhost address
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

// Connect to PostgreSQL
const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ediplan',
  password: '14563221',
  port: 5432,
});

db.connect();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
  res.send(JSON.stringify(`Hello from Node.js!`));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
