import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { app } from 'firebase';
import { AppointmentStatus } from '../app-models/enums';
import { Appointment, DoctorAppointments } from '../app-models/interfaces';
import { DataConverters } from '../app-services/data.converters';

@Component({
  selector: 'app-doctor-queue',
  templateUrl: './doctor-queue.component.html',
  styleUrls: ['./doctor-queue.component.scss'],
})
export class DoctorQueueComponent {
  ApptStatusEnum = AppointmentStatus;

  @Input()
  doctorAppts: DoctorAppointments[];

  @Output()
  appointmentStatusUpdate = new EventEmitter<Appointment>();

  getAppointmentStatus(appt: Appointment) {
    return appt.status == AppointmentStatus.NotStarted
      ? undefined
      : AppointmentStatus[appt.status];
  }

  getActualStartTime(appt: Appointment) {
    return !appt.actualStartTime ? 'not started' : appt.actualStartTime;
  }

  startToggleChanged(appt: Appointment, e: any) {
    this.changeApptStatus(
      appt,
      e.checked ? AppointmentStatus.Started : AppointmentStatus.NotStarted
    );
  }

  async changeApptStatus(appt: Appointment, newStatus: AppointmentStatus) {
    switch (newStatus) {
      case AppointmentStatus.NotStarted:
        appt.actualStartTime = null;
        appt.durationMins = 0;
        break;
      case AppointmentStatus.Started:
        appt.actualStartTime = DataConverters.Time.toNowHHmm();
        break;
      case AppointmentStatus.Completed:
        const now = Number(DataConverters.Time.toNowHHmm());
        const start = Number(appt.actualStartTime || appt.startTime);
        const duration = now - start;
        appt.durationMins = duration > 0 ? duration : 1;
        break;
    }
    appt.status = newStatus;
    this.appointmentStatusUpdate.emit(appt);
  }
}
