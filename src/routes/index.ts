import { Router } from 'express';
import doctorRoutes from './doctorRoutes.ts/index.js'; 
import  patientRoutes  from './patientRoutes.js';
import  appointmentRoutes  from './appointmentRoutes.ts/index.js';

const router = Router();

router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/appointments', appointmentRoutes);

export default router;
