const routes      = require("../app/routes");
const Controller  = require('./Controller');
const Express     = require('express');

/**
 * Cria as rotas declaradas em app/route.js
 * @param {Express app} app - Aplicação express
 * @param {Mongoose model} model - Modelos gerados pelo Mongoose
 */
function BuildRoutes (app, models) {

  // Classe de acesso ao banco
  const db = require('./DbAccess');

  // Itera por todas as rotas R declaradas
  // no arquivo app/routes.js
  Object.keys(routes).forEach(R => {

    // Nova definição de subrota
    const subroutes = Express.Router({ mergeParams: true });
    

    // Objeto da API REST base a ser criada
    let api = routes[R].apiObject;
    // Se foi declarado um objeto
    // para a API, cria a API
    if (api) {
      // Chama controller da API REST base
      Controller(subroutes, db(models[api]));
    }


    // Controller customizado para a rota R
    let cont = routes[R].controller
    // Se foi declarado um controller customizado
    // adiciona-o suas subrotas à rota R
    if (cont) {
      // Chama controller definido para a rota R
      cont(subroutes, models, db);
    }


    // Salva as subrotas da rota R
    app.use(R, subroutes);
    
  });

};

module.exports = BuildRoutes;
