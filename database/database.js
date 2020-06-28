const Sequelize = require("sequelize");

const connection = new Sequelize('nomeBancoDeDados','usuario','senha', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
