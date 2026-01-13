import { Router } from "express";
import { success } from "zod";

const router = Router()

router.get('/', (_req, res) => {
    res.json({ success: true, message: 'ERP API is running..'})
})

export default router;