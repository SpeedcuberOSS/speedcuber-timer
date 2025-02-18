<!--
 Copyright (c) 2022 Joseph Hale <me@jhale.dev>

 This Source Code Form is subject to the terms of the Mozilla Public
 License, v. 2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->

# STIF Icons

The folks over at the World Cube Association and cubing.js have made
some great [cubing icons](https://github.com/cubing/icons).

This project adds additional icons and converts them into icon fonts
(e.g. for use in React Native).

## Usage

The `font` folder contains all the available font/css files. Use as
needed for your application.

<details>
  <summary>react-native-vector-icons</summary>

#### Android Setup

Installing the fonts on Android only requires copying the font file to `react-native-vector-icons`' font directory.

```json
// package.json
{
    "dependencies": { ... },
    "reactNativeVectorIcons": {
      "fontDir": "path/to/your/assets/fonts"
    }
}  
```

```bash
cp font/STIFIcon.ttf path/to/your/assets/fonts
```

#### iOS Setup

Follow the steps for Android above, then run the following command to add the
font name to the `Info.plist`.

```bash
npx rnvi-update-plist package.json ios/YOUR_APP_NAME/Info.plist
```

<details>
  <summary>Or do it manually...</summary>

Installing the fonts on iOS is a little more complicated:

1. Open XCode.
2. In the left pane, choose the project view (the small folder icon on
   the far left of row of icons)
3. Right click your app name and choose **New Group** to create a group
   named `Fonts`.
4. Right click the new `Fonts` folder and choose **Add Files to
   "YOUR_APP"**
   - Choose the font file from your file system.
   - Make sure **Copy items if needed** is enabled.
5. Open `Info.plist` and add the following content inside the top-level
   `<dict>` tag.
   ```
   <key>UIAppFonts</key>
   <array>
     <string>STIFIcon.ttf</string>
   </array>
   ```

</details>

Clean your build directory and re-build for the font to be included in
the app bundle.

#### JavaScript Setup

Then, to use the icons in your React Native project, convert the `.ttf`
file into a usable icon set.

```javascript
import { createIconSet } from '@react-native-vector-icons/common';
import glyphs from '../../lib/stif/icons/font/STIFIcon.json';

const STIFIcon = createIconSet(glyphs, 'STIFIcon', 'STIFIcon.ttf');

export { STIFIcon };
```

Now you can use `STIFIcon` anywhere in your code just as if it were any
other icon set bundled with `react-native-vector-icons`.


</details>

## Contributing

1. Create a new 500x500px icon in `.svg` format.
2. Add the icon to appropriate folder (e.g. `stif/events` or `stif/infractions`)
3. Update the fonts
   ```bash
   fantasticon stif --output fonts --font-types eot woff2 woff ttf --name STIFIcon
   ```
   <!-- ```bash
   yarn run fantasticon src/lib/stif/icons/stif --output src/lib/stif/icons/font --font-types eot woff2 woff ttf --name STIFIcon
   ``` -->

## LICENSE

MPL-2.0

Note, many of the icons are from the MIT Licensed project
[cubing/icons](https://github.com/cubing/icons) project, meaning they
can be obtained under a more permissive license over there. All the
additions in this library, however, are licensed under the limited
copyleft MPL-2.0.