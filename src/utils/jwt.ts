import jwt from "jsonwebtoken";
import {Request} from "express";

export interface AuthRequest extends Request {
    userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
if(!JWT_SECRET){
    console.error("CRITICAL ERROR: JWT_SECRET environment variable is not defined.");
    process.exit(1);
}

export const generateToken = (payload: object, expiresIn = "7d") => {
    return jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn }
    );
};