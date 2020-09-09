import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { TodayQueueComponent } from './today-queue/today-queue.component';
import { TodayAppointmentsAddComponent } from './today-appointments-add/today-appointments-add.component';
import { DoctorQueueComponent } from './doctor-queue/doctor-queue.component';
import { FiltersAppointmentComponent } from './filters-appointment/filters-appointment.component';
import { FilterChipsComponent } from './filter-chips/filter-chips.component';
import { TimePipe } from './app-services/time-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import {
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    AppComponent,
    TodayQueueComponent,
    TodayAppointmentsAddComponent,
    DoctorQueueComponent,
    FiltersAppointmentComponent,
    FilterChipsComponent,
    TimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
