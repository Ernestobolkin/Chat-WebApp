import express, { Request, Response, NextFunction } from 'express';
import { Routes } from './routes/routes';
import { requestLogger, responseLogger } from './helpers/logger';
import mongoose from 'mongoose';
import { config } from './config';
import chalk from 'chalk';

const app = express();
const routes = new Routes();
// Middleware
app.use(express.json());



mongoose
  .connect(config.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log(chalk.green('Connected to MongoDB'));
    // Routes
    app.use('/api', requestLogger, responseLogger);
    app.use('/api', routes.expressRoutes);

    // Error handling middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });

    // Start the server
    const port = config.PORT;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });




