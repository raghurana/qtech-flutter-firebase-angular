import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from '../app-models/interfaces';
import { AppointmentsService } from '../app-services/appointments.service';
import { DataConverters } from '../app-services/data.converters';

@Component({
  selector: 'app-today-appointments-add',
  templateUrl: './today-appointments-add.component.html',
  styleUrls: ['./today-appointments-add.component.scss'],
})
export class TodayAppointmentsAddComponent {
  inputText: string;

  @Input()
  collectionName: string;

  @Output()
  savedSuccessfully = new EventEmitter<Appointment[]>();

  constructor(private dataService: AppointmentsService) {}

  addNew(): void {
    const newAppts = DataConverters.Appointments.fromText(this.inputText);
    this.dataService.saveAppointments(this.collectionName, newAppts);
    this.savedSuccessfully.emit(newAppts);
    this.inputText = '';
  }
}
