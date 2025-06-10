export interface Patient {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  status: StatusType;
  address: string;
}

export const StatusTypes = {
  Inquiry: 'Inquiry',
  Onboarding: 'Onboarding',
  Active: 'Active',
  Churned: 'Churned',
} as const;

export type StatusType = keyof typeof StatusTypes;

export interface PatientFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  status: StatusType;
  address: string;
}
