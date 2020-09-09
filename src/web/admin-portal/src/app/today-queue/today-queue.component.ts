import { Component, OnDestroy, OnInit } from '@angular/core';
import { Appointment, DoctorAppointments } from '../app-models/interfaces';
import { AppointmentsService } from '../app-services/appointments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentStatus } from '../app-models/enums';
import { DataConverters } from '../app-services/data.converters';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-today-queue',
  templateUrl: './today-queue.component.html',
  styleUrls: ['./today-queue.component.scss'],
})
export class TodayQueueComponent implements OnInit, OnDestroy {
  // Private Fields
  private subs: Subscription = new Subscription();

  // Public Bindable Fields
  readonly todayCollectionName = '20201026';
  isSidebarOpen = false;
  isFiltersExpanded = false;
  doctorAppts: DoctorAppointments[];
  firebaseAppts: DoctorAppointments[];
  allDoctors: string[];
  allStatuses: string[];
  selectedDoctors: BehaviorSubject<string[]>;
  selectedStatuses: BehaviorSubject<string[]>;
  startTimeChanged: ReplaySubject<string>;
  startTimeFrom: moment.Moment;
  startTimeTo: moment.Moment;

  constructor(
    public dataService: AppointmentsService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.allStatuses = DataConverters.Enums.toKeyStrings(AppointmentStatus);
    this.selectedStatuses = new BehaviorSubject(this.allStatuses.slice(0, 3));
    this.selectedDoctors = new BehaviorSubject([]);
    this.startTimeChanged = new ReplaySubject<string>(1);
    this.startTimeFrom = moment('2020-01-01 05:00:00', 'YYYY-MM-DD HH:mm:ss');
    this.startTimeTo = moment('2020-01-01 23:59:59', 'YYYY-MM-DD HH:mm:ss');

    this.subs.add(this.selectedStatuses.subscribe(() => this.applyFilters()));
    this.subs.add(this.selectedDoctors.subscribe(() => this.applyFilters()));
    this.subs.add(
      this.startTimeChanged
        .pipe(debounceTime(500))
        .subscribe((val) => this.applyFilters())
    );
    this.subs.add(
      this.dataService
        .getAppointmentsGroupedByDoctors(this.todayCollectionName)
        .subscribe((da) => {
          this.firebaseAppts = da;
          this.doctorAppts = da;
          this.allDoctors = [...new Set(da.map((a) => a.doctorCode))];
          this.selectedDoctors.next(Array.from(this.allDoctors));
          this.selectedStatuses.next(this.selectedStatuses.value);
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onNewAppointmentsAddedSuccessfully(added: Appointment[]) {
    this.isSidebarOpen = false;
    this.snackbar.open(
      `Added ${added.length} new appointments successfully.`,
      'OK',
      { duration: 3000 }
    );
  }

  onAppointmentStatusChanged(changed: Appointment) {
    this.dataService.saveAppointments(this.todayCollectionName, [changed]);
  }

  applyFilters() {
    this.doctorAppts = this.firebaseAppts
      ?.filter((filter1) =>
        this.selectedDoctors.value.includes(filter1.doctorCode)
      )
      .map((filter2) => {
        return {
          ...filter2,
          appointments: filter2.appointments.filter((a) => {
            return (
              Number(a.startTime) >=
                Number(
                  DataConverters.Time.fromDateToHHmm(this.startTimeFrom)
                ) &&
              Number(a.startTime) <=
                Number(DataConverters.Time.fromDateToHHmm(this.startTimeTo)) &&
              this.selectedStatuses.value.includes(AppointmentStatus[a.status])
            );
          }),
        };
      })
      .filter((filter3) => filter3.appointments.length > 0);
  }
}
