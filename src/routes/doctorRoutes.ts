import { Router } from 'express';
import { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } from '../controllers/doctorController.ts/index.js';

const router = Router();

router.post('/', createDoctor); // crear un nuevo doctor
router.get('/', getAllDoctors); // obtener todos los doctores
router.get('/:id', getDoctorById); //obtener un doctor por su ID
router.put('/:id', updateDoctor); // actualizar un doctor por su ID
router.delete('/:id', deleteDoctor); //eliminar un doctor por su ID

export default router;
