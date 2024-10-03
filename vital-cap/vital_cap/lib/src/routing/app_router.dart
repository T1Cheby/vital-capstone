import 'package:go_router/go_router.dart';
import 'package:vital_cap/src/features/authentication/data/firebase_auth_repository.dart';
import 'package:vital_cap/src/features/scanning/presentation/home/HomePage.dart';
import 'package:vital_cap/src/routing/go_router_refresh_stream.dart';

enum AppRoute {
  home,
  scan,
}

final goRouter = GoRouter(
  initialLocation: '/',
  debugLogDiagnostics: false,
  refreshListenable: GoRouterRefreshStream(authRepository.authStateChanges),
  redirect: (context, state) {
    final isAuthenticated = authRepository.currentUser != null;
    final path = state.uri.path;
    if (!isAuthenticated && path != '/') {
      return '/'; // Redirect to login page if not authenticated
    } else {
      return '/loginPage';
    }
  },
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => HomePage(),
      name: AppRoute.home.name,
      routes: [
        GoRoute(
          path: 'scan',
          name: AppRoute.scan.name,
          builder: (context, state) => HomePage(),
        ),
      ],
    ),
  ],
);
