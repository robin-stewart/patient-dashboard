import express from 'express';
import cors from 'cors';
import { sequelize } from './db';
import { Patient } from './models/patient';

const app = express();
app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

app.get('/patients', async (req, res) => {
  const patients = await Patient.findAll();
  res.json(patients);
});

app.post('/patients', async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create patient', details: err });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
