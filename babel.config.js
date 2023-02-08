module.exports = {
  presets: ['@rnx-kit/babel-preset-metro-react-native'],
  plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
