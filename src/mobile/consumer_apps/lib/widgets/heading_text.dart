import 'package:consumer_apps/styles.dart';
import 'package:flutter/material.dart';

class HeadingText extends StatelessWidget {
  final String text;
  final double size;

  const HeadingText({Key key, this.text, this.size = 20.0}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return new Center(
      child: Text(this.text, style: AppTextStyles.headlineText(textFontSize: this.size)),
    );
  }
}
