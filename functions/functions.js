
const conexao = require('./conexao');

const tb_livro = conexao.sequelize.define('tb_livro',{
    nome:{
        type: conexao.Sequelize.STRING
    },
    ano:{
        type: conexao.Sequelize.INTEGER
    },
    preco:{
        type: conexao.Sequelize.STRING
    },
    imagem:{
        type: conexao.Sequelize.TEXT
    },
    link:{
        type: conexao.Sequelize.TEXT
    }
})
//tb_livro.sync({force: true})
module.exports = tb_livro;