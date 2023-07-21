"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientController_1 = require("../controllers/patientController");
const router = (0, express_1.Router)();
// Rutas para pacientes
router.post('/', patientController_1.createPatient); // Crear un nuevo paciente
router.get('/', patientController_1.getAllPatients); // Obtener todos los pacientes
router.get('/:id', patientController_1.getPatientById); // Obtener un paciente por su ID
router.put('/:id', patientController_1.updatePatient); // Actualizar un paciente por su ID
router.delete('/:id', patientController_1.deletePatient); // Eliminar un paciente por su ID
exports.default = router;
