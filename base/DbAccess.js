/**
 * Classe de acesso ao banco pelo Mongoose
 * @param {Mongoose model} model - Model gerado pelo Mongoose
 */
module.exports = function DbAccess(model) {

    // Cópia interna do model
    this._model = model;

    return {

        /**
         * Procura objeto no banco pela query GET
         */
        find: (req, res) => {

            // Procura objetos pela query e o retorna
            this._model.find(req.query)
                .catch(err => res.status(500))
                .then(array => res.status(200).json(array));

        },

        /**
         * Procura objeto no banco pelo ID
         */
        findById: (req, res) => {

            // Procura único objeto pelo ID e o retorna
            this._model.findById(req.params.id)
                .catch(err => res.status(500))
                .then(obj => res.status(200).json(obj));

        },

        /**
         * Insere vários objetos no banco
         */
        insert: (req, res) => {

            // Objetos a serem adicionados
            let array = Array.isArray(req.body)
                ? req.body
                : [req.body];
            // Array de resposta resposta
            let addedObjs = [];
            // Quantidade de objetos a serem adicionados
            let cont = array.length;

            // Itera por todos os elementos
            array.forEach(element =>
                // Salva o elemento no banco
                this._model.create(element)
                    .catch(err => res.status(500))
                    .then(obj => {

                        // Guarda o objet adicionado para
                        // retorná-lo no array de resposta
                        addedObjs.push(obj)

                        // Retorna somente após
                        // inserir todos os objetos
                        if (!--cont) {

                            // Retorna o array ou 
                            // o objeto adicionado
                            res
                                .status(200)
                                .json(
                                    addedObjs.length > 1
                                        ? addedObjs
                                        : addedObjs[0]
                                );
                        }

                    }));
        },

        /**
         * Remove objeto do banco pelo ID
         */
        remove: (req, res) => {

            // Procura único objeto pelo ID e o remove
            this._model.findByIdAndRemove(req.params.id)
                .catch(err => res.status(500))
                .then(obj => res.status(200).json(obj));

        },

        /**
         * Atualiza objeto do banco pelo ID
         */
        update: (req, res) => {

            // Procura único objeto pelo ID e atualiza seus dados
            this._model.findByIdAndUpdate(req.params.id, req.body,{
                    new: true // Retorna o objeto atualizado (Mongoose)
                })
                .catch(err => res.status(500))
                .then(obj => res.status(200).json(obj));
        },
    };

};