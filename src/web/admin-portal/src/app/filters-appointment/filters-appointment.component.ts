import { Component, Input } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-filters-appointment',
  templateUrl: './filters-appointment.component.html',
  styleUrls: ['./filters-appointment.component.scss'],
})
export class FiltersAppointmentComponent {
  showSpinners = false;
  enableMeridian = true;

  @Input()
  allDoctors: string[];

  @Input()
  selectedDoctors: BehaviorSubject<string[]>;

  @Input()
  allStatuses: string[];

  @Input()
  selectedStatuses: BehaviorSubject<string[]>;

  @Input()
  startTimeFrom: Date;

  @Input()
  startTimeTo: Date;

  @Input()
  startTimeChanged: ReplaySubject<string>;

  onStartTimeChanged(whichPart: string) {
    this.startTimeChanged?.next(whichPart);
  }
}
