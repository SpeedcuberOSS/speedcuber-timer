module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
