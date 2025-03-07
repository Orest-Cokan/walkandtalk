// babel.config.js
module.exports = {
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-regenerator',
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: true,
      },
    ],
  ],
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    '@babel/typescript',
  ],
};