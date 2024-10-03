import 'package:flutter/material.dart';

// TO DO: move this whole file to /src/features/initialization/ to replace splash_screen.dart
// TO DO: rename this file to start_up.dart
class StartUp extends StatefulWidget {
  const StartUp({super.key});

  @override
  State<StartUp> createState() => _StartUpState();
}

class _StartUpState extends State<StartUp> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SafeArea(child: Text('Start Up screen')),
    );
  }
}
