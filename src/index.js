import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './lib/mongodb.js';
import historyRoutes from './routes/historyRoutes.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

const whitelist = [
  'http://localhost:59444',
  'http://localhost:3000',
  'https://back-angular-e157d9448e88.herokuapp.com',
 'https://anais-mouelhi.github.io',
  'https://anais-mouelhi.github.io/Angular_localisation_app'
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true // Autorise les cookies à être inclus dans les requêtes CORS
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/history', historyRoutes);

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Arrête le processus en cas d'échec de la connexion
  }
};

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Middleware pour gérer les erreurs 500
app.use((err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

startServer();
