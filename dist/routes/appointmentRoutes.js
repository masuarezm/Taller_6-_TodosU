"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const router = (0, express_1.Router)();
// Rutas para citas
router.post('/', appointmentController_1.createAppointment); // Crear una nueva cita
router.get('/', appointmentController_1.getAllAppointments); // Obtener todas las citas
router.get('/:id', appointmentController_1.getAppointmentById); // Obtener una cita por su ID
router.put('/:id', appointmentController_1.updateAppointment); // Actualizar una cita por su ID
router.delete('/:id', appointmentController_1.deleteAppointment); // Eliminar una cita por su ID
exports.default = router;
