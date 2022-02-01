const { withAppBuildGradle } = require('@expo/config-plugins')

const withPackagingOptionsFixes = (config) => {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      const fix = [
        'packagingOptions {',
        `        pickFirst '**/*.so'`,
        '    }',
      ].join('\n')

      if (!config.modResults.contents.includes(fix)) {
        config.modResults.contents = config.modResults.contents.replace(
          'defaultConfig {',
          `${fix}\n    defaultConfig {`,
        )
      }
    } else {
      addWarningAndroid(
        'android.packagingOptions',
        `Cannot automatically configure app build.gradle if it's not groovy`,
      )
    }
    return config
  })
}

module.exports = withPackagingOptionsFixes