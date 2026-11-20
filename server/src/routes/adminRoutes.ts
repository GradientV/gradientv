// which function answers which URL
// app.ts mounts this at /api/admin, behind requireAuth and then requireAdmin,
// so a client's login gets a 403 from everything in here
import { Router } from 'express';
import { listClients } from '../controllers/adminController.js';
import { listPlans, setPlanStatus } from '../controllers/planController.js';

const router = Router();

router.get('/clients', listClients);
// what came in through "Build your plan" on the public site
router.get('/plans', listPlans);
router.patch('/plans/:id', setPlanStatus);

export default router;
