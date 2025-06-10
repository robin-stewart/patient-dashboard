import {
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { formatDate } from './helpers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePatient, fetchPatients, updatePatient } from '../services/api';
import { useState } from 'react';
import type { PatientFormData } from '../types/patient';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PatientModal } from './patient-modal';

export const PatientsTable = () => {
  const [editData, setEditData] = useState<PatientFormData | undefined>(undefined);

  const queryClient = useQueryClient();

  const {
    data: patients,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  });

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      deleteMutation.mutate(id);
    }
  };

  const updateMutation = useMutation({
    mutationFn: updatePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      setEditData(undefined);
    },
  });

  if (isLoading) return <Skeleton variant="rounded" />;
  if (error) return <div>{(error as Error).message}</div>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date of Birth</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients?.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  {patient.firstName} {patient.middleName} {patient.lastName}
                </TableCell>
                <TableCell>{formatDate(patient.dob)}</TableCell>
                <TableCell>{patient.status}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      setEditData({
                        id: patient.id,
                        firstName: patient.firstName,
                        middleName: patient.middleName,
                        lastName: patient.lastName,
                        dob: patient.dob,
                        status: patient.status,
                        address: patient.address,
                      })
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(patient.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PatientModal
        open={!!editData}
        onClose={() => setEditData(undefined)}
        initialData={editData!}
        onSubmit={(formData) => {
          updateMutation.mutate({ ...editData!, ...formData });
        }}
      />
    </>
  );
};
