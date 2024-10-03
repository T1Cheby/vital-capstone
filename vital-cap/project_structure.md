# VITAL-CAP Project Structure
```
VITAL-CAP/
├── app/
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/
│ │ │ │ ├── com/
│ │ │ │ │ ├── vitalcap/
│ │ │ │ │ │ ├── activities/
│ │ │ │ │ │ │ ├── MainActivity.java
│ │ │ │ │ │ │ └── PatientDataActivity.java
│ │ │ │ │ │ ├── adapters/
│ │ │ │ │ │ │ └── PatientDataAdapter.java
│ │ │ │ │ │ ├── fragments/
│ │ │ │ │ │ │ ├── HomeFragment.java
│ │ │ │ │ │ │ ├── DataCaptureFragment.java
│ │ │ │ │ │ │ └── SettingsFragment.java
│ │ │ │ │ │ ├── models/
│ │ │ │ │ │ │ ├── Patient.java
│ │ │ │ │ │ │ └── VitalSign.java
│ │ │ │ │ │ ├── services/
│ │ │ │ │ │ │ ├── OCRService.java
│ │ │ │ │ │ │ ├── VoiceRecognitionService.java
│ │ │ │ │ │ │ └── DataSyncService.java
│ │ │ │ │ │ └── utils/
│ │ │ │ │ │ └── Constants.java
│ │ │ │ │ │ └── DataParser.java
│ │ │ ├── res/
│ │ │ │ ├── layout/
│ │ │ │ │ ├── activity_main.xml
│ │ │ │ │ ├── fragment_home.xml
│ │ │ │ │ └── fragment_data_capture.xml
│ │ │ │ ├── values/
│ │ │ │ │ ├── strings.xml
│ │ │ │ │ ├── colors.xml
│ │ │ │ │ └── dimens.xml
│ │ │ │ └── drawable/
│ │ │ │ ├── ic_launcher.xml
│ │ │ │ └── img_patient_placeholder.xml
│ │ │ └── AndroidManifest.xml
│ │ ├── test/
│ │ │ └── java/
│ │ │ └── com/
│ │ │ └── vitalcap/
│ │ │ ├── services/
│ │ │ │ └── OCRServiceTest.java
│ │ │ └── utils/
│ │ │ └── DataParserTest.java
│ │ └── androidTest/
│ │ └── java/
│ │ └── com/
│ │ └── vitalcap/
│ │ └── activities/
│ │ └── MainActivityTest.java
├── gradle/
│ └── wrapper/
│ └── gradle-wrapper.properties
├── build.gradle
├── settings.gradle
├── gradlew
├── gradlew.bat
└── README.md
```

## Directory Descriptions

- **app/**: Contains all the application's source files and resource files.

- **app/src/main/java/**: This directory houses the Java/Kotlin source files.
  - **activities/**: All the activity classes for the app's various screens.
  - **adapters/**: Adapter classes for RecyclerView or ListView.
  - **fragments/**: Fragments representing portions of the user interface.
  - **models/**: Data model classes representing the structure of data within the app.
  - **services/**: Service classes for handling background tasks such as data processing and synchronization.
  - **utils/**: Utility classes containing common functions and constants.

- **app/src/main/res/**: Resources such as XML layouts, strings, colors, and drawable assets.
  - **layout/**: XML layout files for the app's UI.
  - **values/**: XML files for strings, colors, dimensions, and various scalar values.
  - **drawable/**: Drawable resources such as images and vector graphics.

- **app/src/main/AndroidManifest.xml**: The manifest file declaring the app's components and permissions.

- **app/src/test/**: Unit tests for the application's business logic.

- **app/src/androidTest/**: Instrumented tests, which run on an Android device.

- **gradle/**: Contains Gradle wrapper files for the project's build system.

- **build.gradle**: The build configuration for the application module.

- **settings.gradle**: The settings file for the Gradle project.

- **gradlew** and **gradlew.bat**: Scripts for running the Gradle wrapper.

