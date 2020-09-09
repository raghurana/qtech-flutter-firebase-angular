import 'package:consumer_apps/data/app_state.dart';
import 'package:consumer_apps/data/appointment.dart';
import 'package:flutter/material.dart';

import 'heading_text.dart';

class DurationStats extends StatelessWidget {
  final AppState state;
  final int maxStatsCount = 5;
  final Map patientPositon = new Map();

  DurationStats({Key key, this.state}) : super(key: key) {
    patientPositon.clear();
    state.myDoctorAppointments.asMap().forEach((index, appt) => {patientPositon[appt.id] = index});
  }

  @override
  Widget build(BuildContext context) {
    var completed = state.myDoctorAppointments.where((a) => a.status == AppointmentStatus.Completed).toList();
    if (completed.isEmpty) return SizedBox.shrink();
    return Expanded(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      SizedBox(height: 30),
      HeadingText(text: "Previous Appointment Stats"),
      Padding(
          padding: EdgeInsets.all(10),
          child: HeadingText(
            text: "You are Patient # ${patientPositionByAppointmentId(state.myAppointment.id)}",
            size: 15,
          )),
      SizedBox(height: 15),
      Expanded(child: buildListView(completed.reversed.toList()))
    ]));
  }

  Widget buildListView(List<Appointment> appts) {
    return ListView.builder(
        itemCount: appts.length > maxStatsCount ? maxStatsCount : appts.length,
        itemBuilder: (context, index) {
          return Padding(padding: EdgeInsets.all(10), child: buildListViewItem(appts[index]));
        });
  }

  Widget buildListViewItem(Appointment appt) {
    final Text patientPosition = Text("Patient # ${patientPositionByAppointmentId(appt.id)}");
    final Text appointmentDuration = Text("${appt.durationMins.toString()} mins");
    return Row(mainAxisAlignment: MainAxisAlignment.center, children: <Widget>[
      Expanded(child: Container(alignment: Alignment.centerRight, child: patientPosition)),
      SizedBox(width: 20),
      Expanded(child: appointmentDuration),
    ]);
  }

  String patientPositionByAppointmentId(String apptId) {
    return (this.patientPositon[apptId] + 1).toString();
  }
}
