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
exports.deletePatient = exports.updatePatient = exports.getPatientById = exports.getAllPatients = exports.createPatient = void 0;
const db_1 = __importDefault(require("..//config/db")); // Archivo donde configuraste la conexión a la base de datos MySQL
// Función para crear un nuevo paciente
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, idNumber, age, phone } = req.body;
    try {
        const result = yield db_1.default.query('INSERT INTO patients (name, lastName, idNumber, age, phone) VALUES (?, ?, ?, ?, ?)', [name, lastName, idNumber, age, phone]);
        const newPatientId = result.insertId;
        const newPatient = { id: newPatientId, name, lastName, idNumber, age, phone };
        res.status(201).json(newPatient);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createPatient = createPatient;
// Función para obtener todos los pacientes
const getAllPatients = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query('SELECT * FROM patients');
        const patients = results;
        res.json(patients);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllPatients = getAllPatients;
// Función para obtener un paciente por su ID
const getPatientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const results = yield db_1.default.query('SELECT * FROM patients WHERE id = ?', [id]);
        if (results == null) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const patient = results[0];
        res.json(patient);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getPatientById = getPatientById;
// Función para actualizar un paciente por su ID
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, lastName, idNumber, age, phone } = req.body;
    try {
        const [results] = yield db_1.default.query('UPDATE patients SET name=?, lastName=?, idNumber=?, age=?, phone=? WHERE id=?', [name, lastName, idNumber, age, phone, id]);
        if (results == null) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json({ message: 'Patient updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updatePatient = updatePatient;
// Función para eliminar un paciente por su ID
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const results = yield db_1.default.query('DELETE FROM patients WHERE id=?', [id]);
        if (results == null) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deletePatient = deletePatient;
