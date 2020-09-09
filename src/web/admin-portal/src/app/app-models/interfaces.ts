import { AppointmentStatus } from './enums';

export interface Appointment {
  id: string;
  startTime: string;
  actualStartTime?: string;
  patientCode: string;
  doctorCode: string;
  status: AppointmentStatus;
  durationMins: number;
}

export interface DoctorAppointments {
  doctorCode: string;
  appointments: Appointment[];
}
