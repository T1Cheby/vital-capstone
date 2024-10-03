import 'package:vital_cap/main.dart';
import 'package:firebase_auth/firebase_auth.dart';
// import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:vital_cap/src/features/authentication/data/firebase_auth_repository.dart';
import 'package:vital_cap/src/routing/app_router.dart';

// TO DO: move this whole file to src/features/scanning/presentation/home/ because this is the presentation layer
// TO DO: rename this file to home.dart
class HomePage extends StatefulWidget {
  HomePage({Key? key});
  final String name = AppRoute.home.name;

  final User? user = FirebaseAuthRepository().currentUser;

  Future<void> signOut(BuildContext context) async {
    // Show a confirmation dialog
    bool confirmSignOut = await showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Confirm Sign Out'),
          content: const Text('Are you sure you want to sign out?'),
          actions: <Widget>[
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop(true); // Return true if confirmed
              },
              child: const Text('Sign Out'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop(false); // Return false if canceled
              },
              child: const Text('Cancel'),
            ),
          ],
        );
      },
    );

    // Sign out if confirmation is true
    if (confirmSignOut == true) {
      await FirebaseAuthRepository().signOut();
      // Navigate to the login page
      Navigator.pushReplacementNamed(context, '/loginPage');
    }
  }

  // Widget _title() {
  //   return const Text('firebase auth test');
  // }

  Widget _userUid() {
    return Text(
      user?.email ?? 'User email',
      // style: Theme.of(context).textTheme.displayLarge,
    );
  }

  Widget _signOutButton(BuildContext context) {
    return ElevatedButton(
      onPressed: () => signOut(context),
      child: const Text('Sign Out'),
    );
  }

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Hello, OUCRU!',
          style: Theme.of(context).textTheme.displayLarge,
        ),
        centerTitle: true,
        backgroundColor: Colors.red[600],
      ),
      body: Column(
        // Wrap the content in a column
        children: [
          Center(
            child: Text(
              'Hello user!',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
          ),
          widget._userUid(),
          widget._signOutButton(context),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Container(
                color: Colors.blue,
                child: Center(
                  child: TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/Feature1');
                    },
                    style: TextButton.styleFrom(
                      backgroundColor: Colors.red,
                    ),
                    child: const Text('Feature 1'),
                  ),
                ),
              ),
              Container(
                child: Center(
                  child: TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/Feature2');
                    },
                    child: const Text('Feature 2'),
                  ),
                ),
              ),
              Container(
                child: Center(
                  child: TextButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/Feature3');
                    },
                    style: TextButton.styleFrom(
                      backgroundColor: Colors.green,
                    ),
                    child: const Text('Feature 3'),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.notifications),
            label: 'Notification',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: Colors.blue[300],
        child: const Text('click'),
      ),
    );
  }
}
