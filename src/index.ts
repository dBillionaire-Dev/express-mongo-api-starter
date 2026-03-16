import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

const PORT: string | number = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const startServer = async (): Promise<void> => {
    try {

        app.listen(PORT, (): void => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();