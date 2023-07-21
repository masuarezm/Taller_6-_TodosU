import { Router } from 'express';
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from '../controllers/patientController.ts/index.js';

const router = Router();

// Rutas para pacientes
router.post('/', createPatient); // Crear un nuevo paciente
router.get('/', getAllPatients); // Obtener todos los pacientes
router.get('/:id', getPatientById); // Obtener un paciente por su ID
router.put('/:id', updatePatient); // Actualizar un paciente por su ID
router.delete('/:id', deletePatient); // Eliminar un paciente por su ID

export default router;
