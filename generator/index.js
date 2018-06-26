module.exports = (api) => {
  const helpers = require('./helpers')(api); // eslint-disable-line global-require

  api.render((tree) => {
    if (Object.prototype.hasOwnProperty.call(tree, helpers.getRouter())) {
      let routerSrc = tree[helpers.getRouter()];
      const routes = routerSrc.match(/component: [0-9a-zA-Z_$]+,{0,1}/g);
      (routes !== null ? routes : []).forEach((route) => {
        const routeName = route.replace('component: ', '').replace(/,$/, '');
        const routeRegExp = new RegExp(`import ${routeName} from (["'][^"']+["']);{0,1}\n`);
        const [routerImport, routerPath] = Array.from(routerSrc.match(routeRegExp));
        routerSrc = routerSrc.replace(routerImport, '');
        routerSrc = routerSrc.replace(route, `component: () => import(${routerPath})${new RegExp(/,$/).test(route) ? ',' : ''}`);
      });
      tree[helpers.getRouter()] = routerSrc; // eslint-disable-line no-param-reassign
    }
  });
};
