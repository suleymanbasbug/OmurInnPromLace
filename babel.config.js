module.exports = function (api) {
  api.cache(false);
  const presets = ['module:@react-native/babel-preset'];
  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          '@app': './app',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
  ];
  return {presets, plugins};
};
