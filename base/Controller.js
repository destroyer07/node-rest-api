/**
 * Classe base de controller
 * Métodos REST implementados:
 *  - GET    api/id
 *  - GET    api/id
 *  - POST   api
 *  - PUT    api/id
 *  - DELETE api/id
 * @param {Express router} router - Aplicação express
 * @param {String} api - Base da API
 * @param {Mongoose model} model - Modelo gerado pelo Mongoose
 */
module.exports = (router, model) => {
    
    // Métodos REST

    router.get('/:id',
        model.findById);

    router.get('/',
        model.find);
    
    router.post('/',
        model.insert);
    
    router.put('/:id',
        model.update);
    
    router.delete('/:id',
        model.remove);
        
};
