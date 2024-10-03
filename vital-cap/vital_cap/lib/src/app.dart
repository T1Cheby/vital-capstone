import 'package:flutter/material.dart';
import 'package:vital_cap/src/global/theme.dart';
import 'package:vital_cap/src/localization/string_hardcoded.dart';
import 'package:vital_cap/src/routing/app_router.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: goRouter,
      debugShowCheckedModeBanner: false,
      onGenerateTitle: (context) => 'Vital Cap'.hardcoded,
      theme: theme,
    );
  }
}
