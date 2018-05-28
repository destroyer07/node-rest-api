const AlunoController = require("./controllers/AlunoController");

module.exports = {
    
    "/alunos": {
        controller: AlunoController,
        apiObject: "Aluno"
    }
    
};