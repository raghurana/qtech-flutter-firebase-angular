import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment, DoctorAppointments } from '../app-models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private firestore: AngularFirestore) {}

  getAppointmentsGroupedByDoctors(
    collection: string
  ): Observable<DoctorAppointments[]> {
    return this.firestore
      .collection<Appointment>(collection)
      .valueChanges()
      .pipe(
        map((appts, index) => {
          return appts.reduce((groups, item: Appointment) => {
            const val = item.doctorCode;
            groups[val] = groups[val] || [];
            groups[val].push(item);
            return groups;
          }, new Map());
        }),
        map((kvp) => {
          const drAppointments = [];
          Object.keys(kvp).forEach((key) => {
            drAppointments.push({ doctorCode: key, appointments: kvp[key] });
          });
          return drAppointments;
        })
      );
  }

  saveAppointments(collectionName: string, appointments: Appointment[]) {
    appointments.forEach(async (a) => {
      await this.firestore.collection(collectionName).doc(a.id).set(a);
    });
  }
}
