// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express"; // Use Express types
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

// Define a custom interface for the user payload
interface CustomJwtPayload extends JwtPayload {
  id: string;
  username: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; 

// Utility function to authenticate token and attach user to request
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Safely extract token after "Bearer"

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
    if (err) {
      res.status(403).json({ message: "Forbidden: Invalid token" });
      return;
    }

    // Type guard to ensure decoded is an object with expected properties
    if (decoded && typeof decoded === "object" && "id" in decoded && "username" in decoded) {
      req.user = decoded as CustomJwtPayload; // Attach user info to request
      next(); // Proceed to the next middleware
    } else {
      res.status(401).json({ message: "Unauthorized: Invalid token payload" });
    }
  });
};

// Optional: Middleware wrapper for API routes if you want to use it as middleware
export const withAuth = (handler: (req: Request, user: CustomJwtPayload) => Promise<Response>) => {
  return async (req: Request, res: Response): Promise<Response> => {
    return new Promise((resolve, reject) => {
      try {
        // Call authenticateToken as middleware
        authenticateToken(req, res, (err) => {
          if (err) {
            return reject(res.status(401).json({ message: err.message }));
          }
          // If no error, proceed to the handler
          resolve(handler(req, req.user as CustomJwtPayload));
        });
      } catch (error: any) {
        return reject(res.status(error.message.includes("Forbidden") ? 403 : 401).json({ message: error.message }));
      }
    });
  };
};
