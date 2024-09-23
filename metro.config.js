const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = {
    server: {
      port: 8082, // 원하는 포트 번호로 변경
    },
  };

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
