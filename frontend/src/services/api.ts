import type { Patient, PatientFormData } from '../types/patient';

const BASE_URL = 'http://localhost:3001/patients';

export const fetchPatients = async (): Promise<Patient[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch patients');
  return res.json();
};

export const createPatient = async (formData: PatientFormData) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error('Failed to create patient');
  return res.json();
};

export const updatePatient = async (formData: PatientFormData) => {
  const res = await fetch(`${BASE_URL}/${formData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error('Failed to update patient');
  return res.json();
};

export const deletePatient = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete patient');
  return res.json();
};
