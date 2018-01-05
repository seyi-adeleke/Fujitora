const path = require('path');
const rootPath = path.normalize(__dirname + '/../');

module.exports = {
    development:{
        db: 'mongodb://localhost/fujitora-dev2',
        rootPath:rootPath,
        port:process.env.PORT || 8080,
        baseUrl: process.env.BASE_URL || 'http://localhost:8080/'
    },
    production:{
        db:process.env.PROD_DB,
        rootPath:rootPath,
        port:process.env.PORT || 80,
        baseUrl: process.env.BASE_URL + '/'
    }
};
