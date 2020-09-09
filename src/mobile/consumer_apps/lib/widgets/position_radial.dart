import 'package:consumer_apps/data/app_state.dart';
import 'package:consumer_apps/widgets/circular_progess.dart';
import 'package:flutter/material.dart';

class PositionRadial extends StatelessWidget {
  final AppState state;

  const PositionRadial({Key key, this.state}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var queuePosition = state.myQueuePosition;
    var progressValue = 1 - (queuePosition / state.myDoctorAppointments.length);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
            padding: const EdgeInsets.only(top: 15, bottom: 10),
            child: Center(
                child: new CircularProgress(
                    header: 'Your Queue Position',
                    centerText: queuePosition.toString(),
                    progressPercentage: progressValue))),
        Center(child: Text(getStartTimeText(queuePosition)))
      ],
    );
  }

  String getStartTimeText(int position) {
    if (position == 0) return "You're On";
    if (position == 1) return "Start Time: ${state.myAppointment.startTime}, You are Next";
    return "Start Time: ${state.myAppointment.startTime}";
  }
}
