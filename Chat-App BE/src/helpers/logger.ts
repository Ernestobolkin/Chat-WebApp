import express, { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';


export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.blue('Request URL:'), req.originalUrl);
    console.log(chalk.blueBright("Request Type:"), req.method);
    next();
}

export const responseLogger = (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        console.log(chalk.red(req.method, req.originalUrl, res.statusCode));
      } else {
        console.log(req.method, req.originalUrl, chalk.green(res.statusCode));
      }
    });
    next();
  };