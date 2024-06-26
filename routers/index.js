const fs = require('fs');
const path = require('path');

const loadRouters = (app) => {
  const routes = [];
  const routersDir = path.join(__dirname);
  
  fs.readdirSync(routersDir).forEach(folder => {
    const folderPath = path.join(routersDir, folder);
    if (fs.lstatSync(folderPath).isDirectory()) {
      fs.readdirSync(folderPath).forEach(file => {
        if (file.endsWith('.js')) {
          const routerPath = path.join(folderPath, file);
          const { routes: routeConfig } = require(routerPath);
          
          app[routeConfig.method](routeConfig.path, routeConfig.execution);
          routes.push({
            name: routeConfig.name,
            category: routeConfig.category,
            path: routeConfig.path,
            method: routeConfig.method,
            parameter: routeConfig.parameter,
            example: routeConfig.example,
          });
        }
      });
    }
  });

  app.get('/', (req, res) => {
    res.json(routes);
    // res.render('index', { title: 'Home Page', message: routes });
  });
};

module.exports = loadRouters;
