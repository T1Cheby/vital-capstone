import 'package:firebase_auth/firebase_auth.dart';

import 'package:flutter/material.dart';
import 'package:vital_cap/src/features/authentication/data/firebase_auth_repository.dart';
import 'package:vital_cap/src/features/authentication/presentation/loginPage.dart';
import 'package:vital_cap/src/features/scanning/presentation/home/HomePage.dart';

// TO DO: move this to src/common_widgets/ because this is reusable (done)
class WidgetTree extends StatefulWidget {
  const WidgetTree({super.key});

  @override
  State<WidgetTree> createState() => _WidgetTreeState();
}

class _WidgetTreeState extends State<WidgetTree> {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
        stream: authRepository.authStateChanges,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return HomePage();
          } else {
            return const LoginPage();
          }
        });
  }
}
