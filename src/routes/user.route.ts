import { Router } from "express";
import { deleteUser } from "../controllers/user.controller.ts";

const router = Router();

/**
 * @swagger
 * /api/users/delete/:id:
 *  delete:
 *      summary: Delete your account
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: id
 *                      properties:
 *                          id:
 *                              type: string
 *      responses:
 *          200:
 *              description: User deleted successfully
 *          404:
 *              description: User not found
 */
router.delete("/:id", deleteUser)

export default router;