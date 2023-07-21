import { Request, Response } from 'express';
import { Patient } from '../models/patientModel.js';
import db from '../config/db.js';

// crear un nuevo paciente
export const createPatient = async (req: Request, res: Response) => {
  const { name, lastName, idNumber, age, phone } = req.body;
  try {
    const result = await db.query('INSERT INTO patients (name, lastName, idNumber, age, phone) VALUES (?, ?, ?, ?, ?)', [name, lastName, idNumber, age, phone]);
    const newPatientId = (result as any).insertId;
    const newPatient: Patient = { id: newPatientId, name, lastName, idNumber, age, phone };
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// obtener todos los pacientes
export const getAllPatients = async (_req: Request, res: Response) => {
  try {
    const results = await db.query('SELECT * FROM patients');
    const patients: any[] = results;
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// obtener un paciente por su ID
export const getPatientById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const results = await db.query('SELECT * FROM patients WHERE id = ?', [id]);
    if (results  == null) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const patient: any = results[0];
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// actualizar un paciente por su ID
export const updatePatient = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, lastName, idNumber, age, phone } = req.body;
  try {
    const [results] = await db.query('UPDATE patients SET name=?, lastName=?, idNumber=?, age=?, phone=? WHERE id=?', [name, lastName, idNumber, age, phone, id]);
    if (results  == null) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json({ message: 'Patient updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// eliminar un paciente por su ID
export const deletePatient = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const results = await db.query('DELETE FROM patients WHERE id=?', [id]);
    if (results  == null) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
