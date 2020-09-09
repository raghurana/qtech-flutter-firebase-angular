import 'package:consumer_apps/data/app_state.dart';
import 'package:consumer_apps/data/appointment.dart';
import 'package:consumer_apps/widgets/duration_stats.dart';
import 'package:consumer_apps/widgets/position_radial.dart';
import 'package:smooth_star_rating/smooth_star_rating.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import './extensions.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'QTech',
      theme: ThemeData(
        primarySwatch: Color.fromARGB(255, 91, 61, 177).toMaterialColor(),
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Patient Code # rr301'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final AppState state = new AppState();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: StreamBuilder<List<Appointment>>(
            stream: state.todayAppointmentStream,
            builder: (context, snapshot) {
              if (!snapshot.hasData) return Center(child: Text("Loading..."));
              if (snapshot.data.isEmpty) return Center(child: Text("No Appointments Today."));

              state.refreshAppointmentsData(snapshot.data);

              if (state.myAppointment == null) return Center(child: Text("No Appointments Booked For You Today."));
              if (state.myAppointment.status == AppointmentStatus.Completed)
                return Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Center(child: Text('Help us improve by rating this visit.')),
                  SmoothStarRating(
                      allowHalfRating: false,
                      starCount: 5,
                      rating: 0,
                      size: 40.0,
                      filledIconData: Icons.star,
                      color: Colors.green,
                      borderColor: Colors.green,
                      spacing: 0.0)
                ]);

              return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [PositionRadial(state: state), DurationStats(state: state)]);
            }));
  }
}
