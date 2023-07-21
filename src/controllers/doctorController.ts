import { Request, Response } from 'express';
import { Doctor } from '../models/doctorModel.js';
import db from '../config/db.js'; // Archivo donde configuraste la conexión a la base de datos MySQL

// Función para crear un nuevo doctor
export const createDoctor = async (req: Request, res: Response) => {
  const { name, lastName, specialty, office, email } = req.body;
  try {
    const result = await db.query('INSERT INTO doctors (name, lastName, specialty, office, email) VALUES (?, ?, ?, ?, ?)', [name, lastName, specialty, office, email]);
    const newDoctorId = (result as any).insertId;
    const newDoctor: Doctor = { id: newDoctorId, name, lastName, specialty, office, email };
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Función para obtener todos los doctores
export const getAllDoctors = async (_req: Request, res: Response) => {
  try {
    const results = await db.query('SELECT * FROM doctors');
    const doctors: any[] = results;
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Función para obtener un doctor por su ID
export const getDoctorById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const results = await db.query('SELECT * FROM doctors WHERE id = ?', [id]);
    if (results  == null) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    const doctor: any = results[0];
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Función para actualizar un doctor por su ID
export const updateDoctor = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, lastName, specialty, office, email } = req.body;
  try {
    const results = await db.query('UPDATE doctors SET name=?, lastName=?, specialty=?, office=?, email=? WHERE id=?', [name, lastName, specialty, office, email, id]);
    if(results  == null) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json({ message: 'Doctor updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// eliminar un doctor por su ID
export const deleteDoctor = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const results = await db.query('DELETE FROM doctors WHERE id=?', [id]);
    if (results  == null) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
