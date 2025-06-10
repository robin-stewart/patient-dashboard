import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  MenuItem,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { PatientFormData } from '../types/patient';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: PatientFormData) => void;
  initialData?: PatientFormData;
}

const defaultForm: PatientFormData = {
  id: 0,
  firstName: '',
  middleName: '',
  lastName: '',
  dob: '',
  status: 'Inquiry',
  address: '',
};

export const PatientModal = ({ open, onClose, onSubmit, initialData }: Props) => {
  const { register, handleSubmit, reset, watch } = useForm<PatientFormData>({
    defaultValues: defaultForm,
  });

  const status = watch('status');

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        dob: initialData.dob?.slice(0, 10),
      });
    } else {
      reset(defaultForm);
    }
    console.log(initialData);
  }, [initialData, reset]);

  const onFormSubmit = (data: PatientFormData) => {
    onSubmit(data);
    onClose();
    reset(defaultForm);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initialData ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="First Name" fullWidth {...register('firstName')} />
            <TextField label="Middle Name" fullWidth {...register('middleName')} />
            <TextField label="Last Name" fullWidth {...register('lastName')} />
            <TextField
              label="Date of Birth"
              type="date"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              fullWidth
              {...register('dob')}
            />
            <TextField
              label="Status"
              select
              fullWidth
              value={status || 'Inquiry'}
              {...register('status')}
            >
              {['Inquiry', 'Onboarding', 'Active', 'Churned'].map((statusOption) => (
                <MenuItem key={statusOption} value={statusOption}>
                  {statusOption}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Address" fullWidth {...register('address')} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initialData ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
