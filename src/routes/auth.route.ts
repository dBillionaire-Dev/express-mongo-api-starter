import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.ts";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: [name, email, password]
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          role:
 *                              type: string
 *      responses:
 *          201:
 *              description: User created successfully
 *          400:
 *              description: Complete all entries
 *          409:
 *              description: Email already exists
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Welcome, please log in to continue
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: [email, password]
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Login successful
 *          400:
 *              description: Complete all entries
 *          401:
 *              description: Invalid credentials
 */
router.post('/login', loginUser);

export default router;