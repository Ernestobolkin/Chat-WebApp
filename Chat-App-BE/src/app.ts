import express, { Request, Response, NextFunction } from 'express';
import { Routes, SocketIORoutes } from './routes/routes';
import { requestLogger, responseLogger } from './helpers/logger';
import mongoose from 'mongoose';
import { config } from './config';
import chalk from 'chalk';
import helmet from 'helmet';
var cors = require('cors')
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

const app = express();
const routes = new Routes();
app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new SocketIOServer(server);

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


    //SOCKET IO
    const socketIORoutes = new SocketIORoutes(io);
    socketIORoutes.setupRoutes();

    const PORT = process.env.PORT || 3000;
    const SOCKET_PORT = process.env.SOCKET_PORT || 3001;
    server.listen(SOCKET_PORT, () => {
      console.log(chalk.greenBright(`Socket IO Server is running on port ${SOCKET_PORT}`));
    });


    // Start the server
    const port = config.PORT;
    app.listen(port, () => {
      console.log(chalk.yellowBright(`Server is running on port ${port}`));
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });




