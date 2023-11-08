import express, { Request, Response, NextFunction } from 'express';
import { Routes } from './routes/routes';
import { requestLogger, responseLogger } from './helpers/logger';
import mongoose from 'mongoose';
import { config } from './config';
import chalk from 'chalk';
import helmet from 'helmet';
var cors = require('cors')

const app = express();
const routes = new Routes();
app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'connect-src': ["'self'", "http://localhost:3000"],
    },
  })
);


mongoose
  .connect(config.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log(chalk.green('Connected to MongoDB'));
    // Routes
    app.use('/api', requestLogger, responseLogger);
    app.use('/api', routes.expressRoutes);

    // Error handling middleware
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
      console.log(chalk.red(err?.message));
      if(err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
      }
      else {
        res.status(500).send('GENERAL_ERROR');
      }
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




