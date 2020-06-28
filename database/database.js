const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas','root','2540', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;