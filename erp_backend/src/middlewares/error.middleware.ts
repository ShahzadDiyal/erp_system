import { Request, Response, NextFunction } from 'express';
import { success } from 'zod';

export function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    console.error('🔥 Error:', err);

    return res.status(err?.statusCode || 500).json({
        success: false,
        message: err?.message || 'Internal server error'
    });
}