import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
    userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
if(!JWT_SECRET){
    console.error("CRITICAL ERROR: JWT_SECRET environment variable is not defined.");
    process.exit(1);
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not provided",
            });
        }

        const decoded = jwt.verify(
            token,
            JWT_SECRET,
        ) as { userId: string };

        req.userId = decoded.userId;

        next();
    } catch (e){
        console.error('JWT Verification Error:', e);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

export {authMiddleware};