module.exports = (api) => {
  // We delete the plugins entry that preloads all the async route chunks:
  api.configureWebpack((config) => {
    config.plugins.forEach((plugin, i) => {
      if (plugin.options && plugin.options.include === 'asyncChunks') {
        config.plugins.splice(i, 1);
      }
    });
  });
};
