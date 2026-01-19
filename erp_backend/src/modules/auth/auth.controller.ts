import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { success } from 'zod';

export class AuthController {
    static async register(req: Request, res: Response) {
        const data = await AuthService.register(req.body);
        return res.status(201).json({ success: true, message: 'User created', data })
    }

    static async login(req: Request, res: Response) {
        const data = await AuthService.login(req.body);
        return res.status(200).json({ success: true, message: 'Login successful', data })
    }
}