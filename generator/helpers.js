const fs = require('fs');

module.exports = api => ({
  guessTsOrJs(filePath) {
    const basePath = filePath.replace(/\.(js|ts)$/, '');
    const tsPath = api.resolve(`${basePath}.ts`);
    return `${basePath}.${fs.existsSync(tsPath) ? 'ts' : 'js'}`;
  },
  getMain() {
    return this.guessTsOrJs('src/main.js');
  },
  getRouter() {
    return this.guessTsOrJs('src/router.js');
  },
});
