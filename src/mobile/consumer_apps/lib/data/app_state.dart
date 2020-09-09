import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:consumer_apps/data/appointment.dart';
import 'package:consumer_apps/extensions.dart';

class AppState {
  final String _myPatientCode;
  Appointment _myAppoinment;
  List<Appointment> _myDoctorsAppointments;

  AppState({loggedInPatientCode = 'rr301'}) : _myPatientCode = loggedInPatientCode;

  String get today => '20201026';

  Appointment get myAppointment => _myAppoinment;

  List<Appointment> get myDoctorAppointments => _myDoctorsAppointments;

  int get myQueuePosition => myDoctorAppointments.where((a) => a.status == AppointmentStatus.NotStarted).length;

  Stream<List<Appointment>> get todayAppointmentStream => Firestore.instance
      .collection(today)
      .snapshots()
      .map((querySnap) => querySnap.documents.map((docSnap) => new Appointment(docSnap)).toList());

  void refreshAppointmentsData(List<Appointment> appointments) {
    this._myAppoinment = appointments.firstWhere(
        (appt) =>
            appt.patientCode == _myPatientCode &&
            //appt.status != AppointmentStatus.Completed &&
            appt.status != AppointmentStatus.Cancelled,
        orElse: () => null);

    this._myDoctorsAppointments = (myAppointment == null)
        ? List.from([])
        : appointments
            .where((appt) => appt.doctorCode == myAppointment.doctorCode)
            .stopWhen((appt) => appt.id == myAppointment.id);
  }
}
