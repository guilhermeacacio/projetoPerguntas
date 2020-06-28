const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas','usuario','senha', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
