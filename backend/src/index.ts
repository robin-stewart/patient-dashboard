import express from 'express';
import cors from 'cors';
import { sequelize } from './db';
import { Patient } from './models/patient';

const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Database connection failed:', err);
});

app.get('/patients', async (_req, res) => {
  const patients = await Patient.findAll();
  res.json(patients);
});

app.post('/patients', async (req, res) => {
  try {
    const { firstName, middleName, lastName, dob, status, address } = req.body;
    const patient = await Patient.create({ firstName, middleName, lastName, dob, status, address });
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create patient' });
  }
});

app.put('/patients/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { firstName, middleName, lastName, dob, status, address } = req.body;
    const patient = await Patient.findByPk(id);

    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    await patient.update({ firstName, middleName, lastName, dob, status, address });
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update patient' });
  }
});

app.delete('/patients/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const patient = await Patient.findByPk(id);

    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    await patient.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});