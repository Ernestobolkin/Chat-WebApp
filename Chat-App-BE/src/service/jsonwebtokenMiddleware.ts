import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { fetchUserDataById } from "../repository/userRepository";
import { config } from "../config";



export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const baseUrl = req.baseUrl;
  if(baseUrl === "/api/login" || baseUrl === "/api/register") {
    return next();
  }
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  try {
    const decoded:any = jwt.verify(token, config.SECRET_KEY);
    const user = await fetchUserDataById(decoded.userId);
    if(!user || !user.email) {
        return res.status(403).json({ message: "Not Authorized"});
    }
    req.userId = decoded.userId; // Store the user ID in the request for later use
    next();
  } catch (error) {
    return res.status(403).json({ message: "Not Authorized"});
  }
};

export const generateToken = (userId: string) => {
    const token = jwt.sign({ userId: userId }, config.SECRET_KEY, {
        expiresIn: "1h", // Token expiration time (e.g., 1 hour)
    });
    return token;
}
