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

### Writing UI Component Stories

Speedcuber Timer uses
[Storybook](https://github.com/storybookjs/react-native) to help with
developing the UI. Storybook makes it easy to visually build and test
components in isolation and yields automated snapshot tests to help the
UI stay stable. It does so by rendering the component library on your
device, emulated or physical, as you build it.

#### Writing Stories
Stories are written in a "story file", which has the extension
`*.stories.tsx`. Typically one story file corresponds to one component
located in the same directory as the story file, though not all
components need a corresponding story file.

A story file for a `Switch` component might look like this:
```typescript
// Switch.stories.tsx
import Switch from './Switch';
import React from 'react';
import { storiesOf } from '@storybook/react-native';

storiesOf('Switch', module)
  .add('default', () => <Switch />)
  .add('disabled', () => <Switch />);
  .add('enabled', () => <Switch enabled />);
```

Notice the `storiesOf` invocation which creates a new grouping of
stories. From there, individual stories are `add`ed to the group with a
name and a function to render the isolated component.

Some best practices for effective story writing:
  * Write stories for controlled components first (i.e. components with
    little to no state, get nearly all the data to render via props).
  * Write stories for small components before big components. It's
    easier to compose components with well written stories into larger,
    more complex components and screens.
  * Write a story before building the component. This helps you design
    the component with your ideal API, which results in more useful
    components at the end. (Yes this is
    [TDD](https://en.wikipedia.org/wiki/Test-driven_development), but
    for components.)

#### Launching Storybook
In this project, Storybook only loads when specifically requested.

*Launch Storybook on Android*
```bash
yarn android:storybook
```

*Launch StoryBook on iOS*
```bash
yarn ios:storybook
```

You can quickly switch between storybook and the main application, even
while the application is running.

*Switch to the main application*
```bash
yarn env:dev
```

*Switch to Storybook*
```bash
yarn env:storybook
```

Stories in newly created story files only appear in Storybook after
running a story discovery process. This process runs by default when
opening Storybook via any of the commands above, but you can also
trigger it manually while the application is running.

*Manually trigger Story discovery*
```bash
yarn env:storybook
```

### Configuring Debugging

0. Close everything down
   - Metro Bundler
   - Running emulators
   - Debugging Browser tabs
   - etc.
1. Start Metro Bundler via `npm start`
2. Start the VS Code debugger from `Run and Debug` -> `Run Android`

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
