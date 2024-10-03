import 'package:firebase_auth/firebase_auth.dart';
import 'package:vital_cap/src/features/authentication/presentation/provider/auth_state.dart';

// TO DO: move this to vital_cap\lib\src\features\authentication\data because this is the repository for later use
class NodeJSAuthRepository {
  final AuthState _nodeJSAuth = authState;

  User? get currentUser => _nodeJSAuth.currentUser;

  Stream<User?> get authStateChanges => _nodeJSAuth.authStateChanges();

  // TO DO: implement this method
  Future<void> signInWithEmailAndPassword({
    required String email,
    required String password,
  }) async {
    // TO DO: send request to backend

    // TO DO: handle response from backend
  }

  // TO DO: implement this method
  Future<void> createUserWithEmailAndPassword({
    required String email,
    required String password,
  }) async {
    // TO DO: send request to backend

    // TO DO: handle response from backend
  }

  // TO DO: implement this method
  Future<void> signOut() async {
    // TO DO: send request to backend

    // TO DO: clear token
  }
}

final NodeJSAuthRepository authRepository = NodeJSAuthRepository();
