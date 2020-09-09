import 'package:flutter/material.dart';

abstract class AppTextStyles {
  static TextStyle headlineText({double textFontSize}) =>
      TextStyle(fontWeight: FontWeight.bold, fontSize: textFontSize);
}
