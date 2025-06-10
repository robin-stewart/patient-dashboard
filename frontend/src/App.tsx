import { Stack, Typography } from '@mui/material';
import { PatientsTable } from './components/patients-table';
import { AddPatientButton } from './components/add-patient-button';

function App() {
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h5">Patient Dashboard</Typography>
        <PatientsTable />
      </Stack>
      <AddPatientButton />
    </>
  );
}

export default App;
