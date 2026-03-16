import { type Request, type Response, type NextFunction } from "express";

interface ApiError extends Error {
    statusCode?: number;
}

const errorMiddleware = ( err: ApiError, req: Request, res: Response, next: NextFunction ) => {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

export default errorMiddleware;