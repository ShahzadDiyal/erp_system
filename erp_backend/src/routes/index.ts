import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";


const router = Router()


router.use('/auth', authRoutes);


router.get('/', (_req, res) => {
    res.json({ success: true, message: 'ERP API is running..'})
})

export default router;