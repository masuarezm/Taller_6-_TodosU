"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorController_1 = require("../controllers/doctorController");
const router = (0, express_1.Router)();
router.post('/', doctorController_1.createDoctor); // Ruta para crear un nuevo doctor
router.get('/', doctorController_1.getAllDoctors); // Ruta para obtener todos los doctores
router.get('/:id', doctorController_1.getDoctorById); // Ruta para obtener un doctor por su ID
router.put('/:id', doctorController_1.updateDoctor); // Ruta para actualizar un doctor por su ID
router.delete('/:id', doctorController_1.deleteDoctor); // Ruta para eliminar un doctor por su ID
exports.default = router;
