module.exports = {
  plugins: ['@babel/plugin-proposal-optional-chaining'],
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
      },
    ],
  ],
};
