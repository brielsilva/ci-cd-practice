const {resolve} = require('path');

module.exports = {
    dialect: 'sqlite',
    storage: resolve(__dirname,'movie.database.sqlite'),
    define: {
        timestamp: true,
        underscored: true
    },
    jwtSecret: 'SEGREDOPOH',
    jwtSession: {session: false}

}