import { type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.ts";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET as string;
if(!SECRET) {
    throw new Error("JWT_SECRET not defined");
}

const registerUser = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        /**
         * Create a new user
         * Check all fields are filled up
         * Check Existing user
         * If not go on and hash password
         * Create user with all the details provided
         * Create JWT
         */
        const { name, email, password, role } = req.body as {
            name: string;
            email: string;
            password: string;
            role: string;
        }

        if ( !name || ! email || !password ) {
            return res.status(400).json({
                success: false,
                message: "Please complete all fields",
            })
        }

        const existing = await User.findOne({email});
        if (existing) {
            return res.status(409).json({
                success: false,
                message: `User with Email: ${email} already exists`,
            })
        }

        const passwordHash: string = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            name,
            email,
            password: passwordHash,
            role,
        });

        const token = jwt.sign(
            { userId: String(newUser._id) },
            SECRET,
            { expiresIn: "7d" }
    );
        return res.status(201).json({
            success: true,
            token,
            newUser: {
                id: String(newUser._id),
                name,
                email,
            },
            message: `Hi ${name}, You are successfully registered`,
        })
    } catch (e) {
        console.error(`Error Message: ${e}`);
        next(e);
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction ) => {
    try{
        const { email, password } = req.body as {
            email: string;
            password: string;
        }

        if ( !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please complete all fields",
            })
        }

        const existingUser = await User.findOne({email}).select("+password");
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            })
        }

        const ok = await bcrypt.compare(password, existingUser.password);
        if(!ok) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            })
        }

        const token = jwt.sign(
            { userId: String(existingUser._id)},
            SECRET,
            {expiresIn: "7d"},
        )

        return res.status(200).json({
            success: true,
            token,
            existingUser: {
                id: String(existingUser._id),
                name: existingUser.name,
                email: existingUser.email,
            },
            message: `Login Successful, Welcome back ${existingUser.name}`,
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export {
    registerUser,
    loginUser,
};