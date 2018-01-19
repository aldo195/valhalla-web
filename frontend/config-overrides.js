const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  // Change importing css to less
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    // Antd constants override. https://ant.design/docs/react/use-with-create-react-app
    modifyVars: {
      // Fetch icons locally instead of Alibaba CDN - see https://ant.design/docs/react/customize-theme
      "@icon-url": "\"/font_zck90zmlh7hf47vi\""
    }
  })(config, env);
  return config;
};
