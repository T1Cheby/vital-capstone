# VITAL-CAP Setup Instructions

This document provides the instructions necessary to set up the development environment for the VITAL-CAP Android application.

## Prerequisites

Before you begin, ensure that you have the following installed:
- Android Studio (latest stable version recommended)
- JDK (Java Development Kit) 8 or later
- Android SDK with API Level 30 or higher
- Git for version control

## Cloning the Repository

Start by cloning the VITAL-CAP repository to your local machine. Open your terminal and run:

```bash
git clone https://github.com/Oucru-Innovations/vital-cap
```
## Opening the Project
1. Open Android Studio.
2. On the welcome screen, select 'Open an Existing Project'.
3. Navigate to the directory where you cloned the repository.
4. Select the VITAL-CAP directory and click 'OK'.

Android Studio will begin to import the project and set up the environment.

## Configuring the SDK
1. Once the project is open, go to 'File' > 'Project Structure' > 'SDK Location'.
2. Ensure that the Android SDK location is correctly set and that the required API levels are installed.
3. Apply the changes if any adjustments are made.

## Building the Project
1. In Android Studio, click on 'Build' > 'Make Project' to start the build process.
2. Address any issues if the build fails and try again.

## Running the App
1. Connect an Android device to your computer or use an emulator.
2. Ensure the device has USB debugging enabled if using a physical device.
3. In Android Studio, select 'Run' > 'Run app'.
4. Choose the device you wish to run the app on and click 'OK'.

The application should start on the selected device.

## Troubleshooting
If you encounter any issues during the setup process, check the following:

* Ensure that all prerequisites are properly installed.
* Confirm that the Android SDK is up-to-date with the necessary API levels.
* For build or sync issues, try 'File' > 'Invalidate Caches / Restart...' in Android Studio.
## Additional Configuration
For additional configurations such as signing configs, flavor dimensions, or build types, refer to the project's build.gradle files.

## Contributing
Please follow the project's contribution guidelines for making changes and submitting pull requests. These guidelines including but not limited by the following documents:
* [coding_standard.md](coding_standard.md)
* [commit_style.md](commit_style.md)
* [git_branch_style.md](git_branch_style.md)

For further assistance, contact the project maintainers or refer to the project's official documentation.

Thank you for setting up the VITAL-CAP project. Happy coding!