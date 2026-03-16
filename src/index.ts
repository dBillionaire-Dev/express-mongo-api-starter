import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.ts";
import { ConnectToDB, DisconnectFromDB } from "./config/db.ts";
import errorMiddleware from "./middlewares/error.middleware.ts";
import authRoute from "./routes/auth.route.ts";
import userRoute from "./routes/user.route.ts";
import dotenv from 'dotenv';
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

const PORT: string | number = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)

const startServer = async (): Promise<void> => {
    try {
        console.log('Connecting to database...');
        await ConnectToDB(); // wait for DB connection
        console.log('Database connected successfully!');

        app.listen(PORT, (): void => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();