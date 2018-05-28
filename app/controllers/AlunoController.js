/**
 * Controlador de Aluno
 * @param {Express app} app - App do mongoose
 * @param {Object[]} models - Conjunto dos models da aplicação
 * @param {DbAccess} db - Classe de acesso ao banco
 */
module.exports = (app, models, db) => {

    app.post('/medianotas', (req, res) => {
        let alunos = req.body;
        
        let response = {
            media: 0.0,
            quantidade: 0
        }
        alunos.forEach(aluno => {
            response.media += aluno.nota;
            response.quantidade++;
        });
        
        response.media /= response.quantidade;
        
        res.json(response);
    });

}
