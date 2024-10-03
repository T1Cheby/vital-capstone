const { messaging } = require('firebase-admin');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('files', 'root', null, {
    host: 'localhost',
    logging: false,
    dialect: 'mysql'
});

const connectionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

(async () => {
    await connectionDB();
})();

module.exports = { sequelize, connectionDB };
