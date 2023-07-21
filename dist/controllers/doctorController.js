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
exports.deleteDoctor = exports.updateDoctor = exports.getDoctorById = exports.getAllDoctors = exports.createDoctor = void 0;
const db_1 = __importDefault(require("../config/db")); // Archivo donde configuraste la conexión a la base de datos MySQL
// Función para crear un nuevo doctor
const createDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, specialty, office, email } = req.body;
    try {
        const result = yield db_1.default.query('INSERT INTO doctors (name, lastName, specialty, office, email) VALUES (?, ?, ?, ?, ?)', [name, lastName, specialty, office, email]);
        const newDoctorId = result.insertId;
        const newDoctor = { id: newDoctorId, name, lastName, specialty, office, email };
        res.status(201).json(newDoctor);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createDoctor = createDoctor;
// Función para obtener todos los doctores
const getAllDoctors = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query('SELECT * FROM doctors');
        const doctors = results;
        res.json(doctors);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllDoctors = getAllDoctors;
// Función para obtener un doctor por su ID
const getDoctorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const results = yield db_1.default.query('SELECT * FROM doctors WHERE id = ?', [id]);
        if (results == null) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        const doctor = results[0];
        res.json(doctor);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getDoctorById = getDoctorById;
// Función para actualizar un doctor por su ID
const updateDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, lastName, specialty, office, email } = req.body;
    try {
        const results = yield db_1.default.query('UPDATE doctors SET name=?, lastName=?, specialty=?, office=?, email=? WHERE id=?', [name, lastName, specialty, office, email, id]);
        if (results == null) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json({ message: 'Doctor updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateDoctor = updateDoctor;
// Función para eliminar un doctor por su ID
const deleteDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const results = yield db_1.default.query('DELETE FROM doctors WHERE id=?', [id]);
        if (results == null) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteDoctor = deleteDoctor;
