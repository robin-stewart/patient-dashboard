import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { PatientModal } from './patient-modal';
import type { PatientFormData } from '../types/patient';

export const AddPatientButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
        onClick={() => setIsOpen(true)}
      >
        <AddIcon />
      </Fab>
      <PatientModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={function (formData: PatientFormData): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};
