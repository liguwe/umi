import getConfig from 'af-webpack/getConfig';
import assert from 'assert';

export default function(service) {
  const { config } = service;

  const afWebpackOpts = service.applyPlugins('modifyAFWebpackOpts', {
    initialValue: {
      cwd: service.cwd,
    },
  });

  assert(
    !('chainConfig' in afWebpackOpts),
    `chainConfig should not supplied in modifyAFWebpackOpts`,
  );
  afWebpackOpts.chainConfig = webpackConfig => {
    service.applyPlugins('chainWebpackConfig', {
      args: webpackConfig,
    });
    if (config.chainWebpackConfig) {
      config.chainWebpackConfig(webpackConfig);
    }
  };

  return getConfig(afWebpackOpts);
}
