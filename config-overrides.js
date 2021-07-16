/* eslint-disable */

process.env.COUNTRY = process.env.COUNTRY || 'se';
process.env.LANGUAGE = process.env.LANGUAGE || 'sv';
process.env.TARGET = process.env.TARGET || 'local';
process.env.PORT = '3000';

const merge = require('deepmerge');
const fs = require('fs');

const appPackageJson = require('./package.json');

module.exports = {
  webpack: function override(config, env) {
    //do stuff with the webpack config...

    const defineWebpackPluginIndex = config.plugins.findIndex(
      (item) => item.constructor.name === 'DefinePlugin'
    );

    const interpolateHtmlPluginIndex = config.plugins.findIndex(
      (item) => item.constructor.name === 'InterpolateHtmlPlugin'
    );

    const htmlWebpackPluginIndex = config.plugins.findIndex(
      (item) => item.constructor.name === 'HtmlWebpackPlugin'
    );

    const translations = getLocalizedFile(
      process.env.COUNTRY,
      process.env.LANGUAGE,
      'translations',
      'translations.json'
    );

    const localizedConfig = getLocalizedFile(
      process.env.COUNTRY,
      process.env.LANGUAGE,
      'config',
      `config.${process.env.TARGET}.json`
    );

    config.plugins[htmlWebpackPluginIndex].options = {
      ...config.plugins[htmlWebpackPluginIndex].options,
      use_esi: env !== 'development',
      version: `Environment: ${process.env.TARGET}, Locale: ${
        process.env.COUNTRY
      }/${process.env.LANGUAGE}, Version: ${
        appPackageJson.version
      } Date: ${new Date()}`,
    };

    if (env !== 'development') {
      config.plugins[
        htmlWebpackPluginIndex
      ].options.minify.removeComments = false;
    }

    // Alter values that will be provided to HtmlWebpackPlugin can be used with %PARAM_NAME%
    config.plugins[interpolateHtmlPluginIndex].replacements = {
      ...config.plugins[interpolateHtmlPluginIndex].replacements,
      APP_HEADER: translations.appHeader.title,
    };

    // Alter DefineWebpackPlugin config
    config.plugins[defineWebpackPluginIndex].definitions = {
      ...config.plugins[defineWebpackPluginIndex].definitions,
      'process.env': {
        ...config.plugins[defineWebpackPluginIndex].definitions['process.env'],
        TRANSLATIONS: JSON.stringify(translations),
        COUNTRY: JSON.stringify(process.env.COUNTRY),
        LANGUAGE: JSON.stringify(process.env.LANGUAGE),
      },
      CSS_CONFIG: Object.keys(localizedConfig).reduce(
        (res, key) => {
          return {
            ...res,
            [key.toUpperCase()]: JSON.stringify(localizedConfig[key]),
          };
        },
        {
          COUNTRY: JSON.stringify(process.env.COUNTRY),
          LANGUAGE: JSON.stringify(process.env.LANGUAGE),
          VERSION: JSON.stringify(appPackageJson.version),
        }
      ),
    };


    return config;
  },

  paths: function (paths, env) {
    if (env === 'development') {
      return paths;
    }

    paths.publicUrlOrPath = `/`;

    // changing output path to dist
    paths.appBuild = paths.appBuild.replace('/build', '/dist');

    return paths;
  },
};

const overwriteMerge = (_, sourceArray) => sourceArray;

const getLocalizedFile = (market, language, directory, fileName) => {
  const fileTree = [
    `${directory}/${fileName}`,
    `${directory}/${market}/${fileName}`,
    `${directory}/${market}/${language}/${fileName}`,
  ];

  return fileTree.reduce((acc, file) => {
    if (fs.existsSync(file)) {
      const translation = JSON.parse(
        fs.readFileSync(file, { encoding: 'UTF-8' })
      );
      return merge(acc, translation, { arrayMerge: overwriteMerge });
    }
    return acc;
  }, {});
};
