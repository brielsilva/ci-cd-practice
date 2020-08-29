const {resolve} = require('path');

module.exports = {
    dialect: 'sqlite',
    storage: resolve(__dirname,'database.sqlite'),
    define: {
        timestamp: true,
        underscored: true
    }
}