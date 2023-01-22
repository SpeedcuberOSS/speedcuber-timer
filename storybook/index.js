// if you use expo remove this line
// import { AppRegistry } from 'react-native';

import './rn-addons';

import {
  addDecorator,
  configure,
  getStorybookUI,
} from '@storybook/react-native';

import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import { getCurrentTheme } from '../src/ui/themes';
import { loadStories } from './storyLoader';
import { withKnobs } from '@storybook/addon-knobs';

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({ asyncStorage: null });
const Storybook = () => (
  <PaperProvider theme={getCurrentTheme()}>
    <StorybookUIRoot />
  </PaperProvider>
);

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
// AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default Storybook;
