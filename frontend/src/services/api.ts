import type { Patient } from '../types/patient';

export const fetchPatients = async (): Promise<Patient[]> => {
  const res = await fetch('http://localhost:3001/patients');
  if (!res.ok) throw new Error('Failed to fetch patients');
  return res.json();
};
