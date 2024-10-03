import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:vital_cap/src/features/authentication/data/firebase_auth_repository.dart';

class AuthState extends ChangeNotifier {
  AuthState() {
    _init();
  }

  bool _isAuthenticated = false;
  bool get isAuthenticated => _isAuthenticated;
  String accessToken = '';
  String get getToken => accessToken;
  User? get currentUser => null;

  Stream<User?> authStateChanges() {
    return this.stream; // wrong code here, needa check back
  }

  void _init() async {
    final user = authRepository.currentUser;
    _isAuthenticated = user != null;
    notifyListeners();
  }
}

final AuthState authState = AuthState();
