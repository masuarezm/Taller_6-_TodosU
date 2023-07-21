import { Request, Response } from 'express';
import { Appointment } from '../models/appointmentModel.js';
import db from '../config/db.js';

// crear una nueva cita
export const createAppointment = async (req: Request, res: Response) => {
  const { patientId, specialty } = req.body;
  try {
    const result = await db.query('INSERT INTO appointments (patientId, specialty) VALUES (?, ?)', [patientId, specialty]);
    const newAppointmentId = (result as any).insertId;
    const newAppointment: Appointment = { id: newAppointmentId, patientId, specialty };
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// obtener todas las citas
export const getAllAppointments = async (_req: Request, res: Response) => {
  try {
    const results = await db.query('SELECT * FROM appointments');
    const appointments: any[] = results;
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// obtener una cita por su ID
export const getAppointmentById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const results = await db.query('SELECT * FROM appointments WHERE id = ?', [id]);
    if (results  == null) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    const appointment: any = results[0];
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

//  actualizar una cita por su ID
export const updateAppointment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { patientId, specialty } = req.body;
  try {
    const results = await db.query('UPDATE appointments SET patientId=?, specialty=? WHERE id=?', [patientId, specialty, id]);
    if (results  == null) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// eliminar una cita por su ID
export const deleteAppointment = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const results = await db.query('DELETE FROM appointments WHERE id=?', [id]);
    if (results  == null) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
