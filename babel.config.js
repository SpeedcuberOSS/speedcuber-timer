const overrideReactNativePaperIcons = [
  'module-resolver',
  {
    alias: {
      'react-native-vector-icons/MaterialCommunityIcons': '@react-native-vector-icons/material-design-icons',
    },
  },
]

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [overrideReactNativePaperIcons, 'react-native-reanimated/plugin'],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'transform-remove-console'],
    },
  },
};
