const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const {withSentryConfig} = require('@sentry/react-native/metro');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    alias: {
      '@assets': __dirname + '/src/assets',
      '@components': __dirname + '/src/components',
      '@constants': __dirname + '/src/constants',
      '@contexts': __dirname + '/src/contexts',
      '@database': __dirname + '/src/database',
      '@hooks': __dirname + '/src/hooks',
      '@navigations': __dirname + '/src/navigations',
      '@screens': __dirname + '/src/screens',
      '@services': __dirname + '/src/services',
      '@store': __dirname + '/src/store',
      '@utils': __dirname + '/src/utils',
    },
  },
};

module.exports = withSentryConfig(
  withSentryConfig(mergeConfig(defaultConfig, config)),
);
