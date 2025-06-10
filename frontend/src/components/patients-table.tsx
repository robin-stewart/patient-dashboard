import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { usePatients } from '../hooks/use-patients';
import { formatDate } from './helpers';

export const PatientsTable = () => {
  const { data: patients, isLoading, error } = usePatients();

  if (isLoading) return <Skeleton variant="rounded" />;
  if (error) return <div>{(error as Error).message}</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Date of Birth</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
