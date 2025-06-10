import { useQuery } from '@tanstack/react-query';
import { fetchPatients } from '../services/api';

export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  });
};
