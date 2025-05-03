const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');


/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
let config = {};
config = mergeConfig(getDefaultConfig(__dirname), config);
config = wrapWithReanimatedMetroConfig(config);

module.exports = config;
