import 'package:flutter/material.dart';
// import 'package:vital_cap/src/app.dart';
import 'package:firebase_core/firebase_core.dart';
<<<<<<< Updated upstream
import 'package:vital_cap/src/features/scanning/presentation/home/HomePage.dart';
import 'package:vital_cap/src/routing/Feature1.dart';
import 'package:vital_cap/src/routing/Feature2.dart';
import 'package:vital_cap/src/routing/Feature3.dart';
import 'package:vital_cap/src/features/initialization/presentation/StartUp.dart';
=======
import 'package:vital_cap/src/features/scanning/presentation/camera/feature_1.dart';
import 'package:vital_cap/src/routing/feature_2.dart';
import 'package:vital_cap/src/routing/feature_3.dart';
import 'package:vital_cap/src/features/scanning/presentation/home/home_page.dart';
// import 'package:vital_cap/src/routing/start_up.dart';
>>>>>>> Stashed changes
// import 'package:google_fonts/google_fonts.dart';
import 'package:vital_cap/src/common_widgets/widget_tree.dart';
import 'package:vital_cap/src/features/authentication/presentation/loginPage.dart';

import 'firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  // Global.setFlavor(Flavor.prod);
  // runApp(const App());

  // TO DO: move this MaterialApp into src/app.dart
  runApp(MaterialApp(
    title: 'Flutter Demo',
    // TO DO: move ThemeData() into src/global/theme.dart
    theme: ThemeData(
      primarySwatch: Colors.blue,
      textTheme: const TextTheme(
        displayLarge: TextStyle(
            fontSize: 30.0, fontWeight: FontWeight.bold, color: Colors.black),
        headlineSmall: TextStyle(
            fontSize: 24.0, fontWeight: FontWeight.bold, color: Colors.black),
        bodyMedium: TextStyle(fontSize: 14.0, color: Colors.black),
      ),
      textButtonTheme: TextButtonThemeData(
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all<Color>(Colors.blue),
          foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
          textStyle: MaterialStateProperty.all<TextStyle>(
            const TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold),
          ),
          padding: MaterialStateProperty.all<EdgeInsets>(
            const EdgeInsets.symmetric(vertical: 76.0, horizontal: 32.0),
          ),
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8.0),
            ),
          ),
        ),
      ),
      elevatedButtonTheme: const ElevatedButtonThemeData(
          // future theme for elevated button
          ),
    ),

    home: const WidgetTree(),
    // initialRoute: '/HomePage',
    // TO DO: implement go_router package following src/routing/app_router.dart
    routes: {
      //   // '/': (context) => const StartUp(),
      '/loginPage': (context) => const LoginPage(),
      '/HomePage': (context) => HomePage(),
      '/Feature1': (context) => const Feature1(),
      '/Feature2': (context) => const Feature2(),
      '/Feature3': (context) => const Feature3(),
    },
  ));
}
