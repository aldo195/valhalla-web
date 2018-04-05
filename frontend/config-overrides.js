module.exports = function override(config, env) {
  // Use awesome-typescript-loader instead of ts-loader, for better caching.
  const oneOf = config.module.rules.find(conf => {
    return conf.oneOf;
  }).oneOf;

  const rule = oneOf.find(conf => {
    return (
      conf.use &&
      conf.use.find(use => {
        return use.loader && use.loader.includes('ts-loader');
      })
    );
  });

  const tsLoader = rule.use[0];
  tsLoader.loader = require.resolve('awesome-typescript-loader');
  tsLoader.options = {
    errorsAsWarnings: env === 'development',
    useBabel: true,
    useCache: true,
  };

  // Override Ant's LESS constants (https://ant.design/docs/react/use-with-create-react-app).
  const {injectBabelPlugin} = require('react-app-rewired');
  const rewireLess = require('react-app-rewire-less');

  // Change importing css to less.
  config = injectBabelPlugin(['import', {libraryName: 'antd', style: true}], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      // Fetch icons locally instead of Alibaba CDN (https://ant.design/docs/react/customize-theme).
      '@icon-url': '"/iconfont"',
    },
  })(config, env);

  return config;
};
