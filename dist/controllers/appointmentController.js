"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointment = exports.getAppointmentById = exports.getAllAppointments = exports.createAppointment = void 0;
const db_1 = __importDefault(require("../config/db")); // Archivo donde configuraste la conexión a la base de datos MySQL
// Función para crear una nueva cita
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId, specialty } = req.body;
    try {
        const result = yield db_1.default.query('INSERT INTO appointments (patientId, specialty) VALUES (?, ?)', [patientId, specialty]);
        const newAppointmentId = result.insertId;
        const newAppointment = { id: newAppointmentId, patientId, specialty };
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createAppointment = createAppointment;
// Función para obtener todas las citas
const getAllAppointments = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query('SELECT * FROM appointments');
        const appointments = results;
        res.json(appointments);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllAppointments = getAllAppointments;
// Función para obtener una cita por su ID
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const results = yield db_1.default.query('SELECT * FROM appointments WHERE id = ?', [id]);
        if (results == null) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        const appointment = results[0];
        res.json(appointment);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAppointmentById = getAppointmentById;
// Función para actualizar una cita por su ID
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { patientId, specialty } = req.body;
    try {
        const results = yield db_1.default.query('UPDATE appointments SET patientId=?, specialty=? WHERE id=?', [patientId, specialty, id]);
        if (results == null) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json({ message: 'Appointment updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateAppointment = updateAppointment;
// Función para eliminar una cita por su ID
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const results = yield db_1.default.query('DELETE FROM appointments WHERE id=?', [id]);
        if (results == null) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteAppointment = deleteAppointment;
