module.exports = (api) => {
  api.render((tree) => {
    if (Object.prototype.hasOwnProperty.call(tree, 'src/router.js')) {
      let routerSrc = tree['src/router.js'];
      const routes = routerSrc.match(/component: [0-9a-zA-Z_$]+,{0,1}/g);
      (routes !== null ? routes : []).forEach((route) => {
        const routeName = route.replace('component: ', '').replace(/,$/, '');
        const routeRegExp = new RegExp(`import ${routeName} from (["'][^"']+["']);{0,1}\n`);
        const [routerImport, routerPath] = Array.from(routerSrc.match(routeRegExp));
        routerSrc = routerSrc.replace(routerImport, '');
        routerSrc = routerSrc.replace(route, `component: () => import(${routerPath})${new RegExp(/,$/).test(route) ? ',' : ''}`);
      });
      tree['src/router.js'] = routerSrc; // eslint-disable-line no-param-reassign
    }
  });
};
