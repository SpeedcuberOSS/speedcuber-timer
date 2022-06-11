<!--
 Copyright (c) 2022 Joseph Hale
 
 This Source Code Form is subject to the terms of the Mozilla Public
 License, v. 2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->

# Contributing

Thank you for your interest in contributing to this project! There are
lots of ways you can do so:
 - [Sponsoring the developer](https://github.com/sponsors/jhale1805) to
   fund the app's continued presence on Google Play and bring it to the
   Apple App Store.
 - [Submitting feature
   requests](https://github.com/SpeedcuberOSS/BinaryClock/issues/new/choose).
 - [Reporting
   bugs](https://github.com/SpeedcuberOSS/BinaryClock/issues/new/choose).
 - Developing new features/bug fixes.
 - (Coming Soon!) Adding and updating translations.

The rest of this document will provide a guide to setting up your
development environment so you can bring your ideas for this project to
life.

## Development Setup

Start by following the [React Native CLI
Quickstart](https://reactnative.dev/docs/environment-setup) from the
official docs.

Then fork and clone this repository to your machine.
- Note, members of the SpeedcuberOSS organization can directly clone
this project, no forking required.

From there you can start experimenting with making any changes you like!

## Directory Structure
Nearly all development on Speedcuber Timer occurs within the `src`
folder. Here's what each subfolder contains:

- `components`: Individual, reusable UI components for the clock and its
  settings page.
- `localization`: Translations and localization settings.
- `navigation`: Controls for navigating between screens of the app.
- `screens`: Complete screens for the app.
- `utils`: Various helper utilities and functions.


## Submitting Contributions
After completing the installation steps above, make whatever bug fixes
or improvements you want in the codebase.

When you are done, simply commit your code with a brief message
explaining what was changed, and why. A series of automated checks will
run to make sure everything looks good before the commit gets saved:
- The unit test suite will automatically run and inform you of any
  failing tests that need fixing.
- Linters will automatically run and correct any code formatting
  problems. Make sure to `git add .` after these run to capture their
  changes.

Finally push up your changes to your fork and open a Pull Request (PR)
back into this project.
- A bot will post a link on your PR asking you to sign a standard
  Contributor License Agreement (CLA) giving me permission to integrate
  your contribution into the project.
- Any questions about your contribution will be discussed within the
  PR's comment section.
- After everything looks great, your PR will be merged into the `main`
  branch!

## Other Notes

### Creating a Release Build

#### Google Play Store
1. Open `android/gradle.properties` and update the `SPEEDCUBER_TIMER`
   variables with the corresponding values stored in our password
   manager.
    - These variables MUST be reset before committing to prevent leakage
      of secrets.
2. Make sure the `keystore` file is copied from the password manager to
   `android/app`
3. Run the following commands to create the release build.
```
cd android
./gradlew bundleRelease
```
4. Create a new release in the Google Play Console and upload the
   `android/app/build/outputs/bundle/release/app-release.aab`.

#### Apple App Store
Speedcuber Timer is not yet on the Apple App Store due to the cost of
the Apple Developer Program ($100 annually). If you want to help
Speedcuber Timer become available on iOS, consider
[sponsoring](https://github.com/sponsors/jhale1805) this project to help
cover those costs.