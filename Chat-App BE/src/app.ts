import express, { Request, Response, NextFunction } from 'express';
import { Routes } from './routes/routes';
import { requestLogger, responseLogger } from './helpers/logger';

const app = express();
const routes = new Routes();
// Middleware
app.use(express.json());

// Routes
app.use('/api', requestLogger, responseLogger);
app.use('/api', routes.expressRoutes);


// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});