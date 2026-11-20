// which function answers which URL
// app.ts mounts this at /api/plan. there's no requireAuth in front of it on purpose:
// it's the "Build your plan" form on the public site. reading what came in is
// in adminRoutes.ts, behind the admin login
import { Router } from 'express';
import { createPlan } from '../controllers/planController.js';

const router = Router();

router.post('/', createPlan);

export default router;
