import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { PatientModal } from './patient-modal';
import type { PatientFormData } from '../types/patient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPatient } from '../services/api';

export const AddPatientButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

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
        onSubmit={(formData: PatientFormData) => {
          mutation.mutate(formData);
          setIsOpen(false);
        }}
      />
    </>
  );
};
