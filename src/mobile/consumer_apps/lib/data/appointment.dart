import 'package:cloud_firestore/cloud_firestore.dart';

class Appointment {
  String startTime;
  String patientCode;
  String doctorCode;
  AppointmentStatus status;
  int durationMins;
  String id;

  Appointment(DocumentSnapshot snapshot) {
    startTime = snapshot['startTime'];
    patientCode = snapshot['patientCode'];
    doctorCode = snapshot['doctorCode'];
    status = AppointmentStatus.values[snapshot['status']];
    durationMins = snapshot['durationMins'];
    id = snapshot['id'];
  }
}

enum AppointmentStatus { NotStarted, Started, Completed, Cancelled }
