import 'package:consumer_apps/widgets/heading_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';

class CircularProgress extends StatelessWidget {
  final String header;
  final String centerText;
  final double progressPercentage;

  const CircularProgress({Key key, this.header, this.centerText, this.progressPercentage}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return new CircularPercentIndicator(
      radius: 200.0,
      lineWidth: 13.0,
      animation: false,
      percent: progressPercentage,
      center: HeadingText(text: centerText, size: 80),
      header: Padding(padding: EdgeInsets.fromLTRB(0, 10, 0, 10), child: HeadingText(text: header)),
      circularStrokeCap: CircularStrokeCap.round,
      progressColor: Color.fromARGB(255, 91, 61, 177),
    );
  }
}
