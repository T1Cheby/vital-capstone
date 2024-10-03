# Coding Standards for Android Project

## Introduction

This document outlines the coding standards, conventions, and tools used in our Android application development to ensure code consistency, readability, and maintainability. Integrating static code analysis tools helps automate the enforcement of these standards.

## Code Formatting and Style

### Flutter

Please checkout [this document](https://dart.dev/effective-dart/style) for more information about code style

## Static Code Analysis using VSCode

### Flutter

Please checkout [this document](https://docs.flutter.dev/tools/vs-code) for more information.

## Best Practices

- **Consistency**: Follow the project's established coding conventions for both Kotlin and Java code. Refer to the configurations of Ktlint, Detekt, and Checkstyle for specifics.
- **Readability**: Write code that is easy to read and understand. Use meaningful names for variables, methods, and classes. Use snake naming convention for Kotlin and camel naming convention for Java. (Ngan check dum naming convention phu` hop voi android project)
-
- **Simplicity**: Write simple code that is easy to maintain. Avoid complex logic, nested loops, and deeply nested conditional statements.
- **Comments**: Use comments sparingly; write self-documenting
- **Efficiency**: Write efficient code; avoid unnecessary object creation and method calls within loops.
- **Error Handling**: Properly handle errors and exceptions. (Optional: Prefer specific exceptions over general exceptions).
- **Security**: Follow best practices for Android security. (Cai nay Ngan check dum cac tieu chuan can dung de dam bao an toan) Protect sensitive information and perform input validation.

## Continuous Integration

- Our CI pipeline is configured to run Ktlint, Detekt, PMD, (Ngan check voi confirm dum) and SpotBugs on every push and pull request. Ensure your code passes all checks before merging.

## IDE Integration

- Configure your IDE to use the project's coding standards for Kotlin and Java. This ensures code consistency and reduces the need for formatting changes.

## Conclusion

Adhering to these coding standards and regularly using the configured static code analysis tools will help maintain the high quality of our codebase. Continuous integration helps ensure that code meets our standards before it is merged, supporting our goal of developing a maintainable, efficient, and secure application.
