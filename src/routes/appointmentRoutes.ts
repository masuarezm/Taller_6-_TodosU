import { Router } from 'express';
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointmentController.ts/index.js';

const router = Router();

// Rutas para citas
router.post('/', createAppointment); // Crear cita
router.get('/', getAllAppointments); // Obtener citas
router.get('/:id', getAppointmentById); // Obtener una cita por su ID
router.put('/:id', updateAppointment); // Actualizar una cita por su ID
router.delete('/:id', deleteAppointment); // Eliminar una cita por su ID

export default router;
