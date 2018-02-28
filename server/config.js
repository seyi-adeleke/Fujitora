const path = require('path');
const rootPath = path.normalize(__dirname + '/../');

module.exports = {
    development:{
        db: 'mongodb://localhost/fujitora-dev4',
        rootPath:rootPath,
        port:process.env.PORT || 8080,
        baseUrl: process.env.BASE_URL || 'http://localhost:8080/'
    },
    production:{
        db:process.env.PROD_DB,
        rootPath:rootPath,
        port:process.env.PORT,
        baseUrl: process.env.BASE_URL + '/'
    },
    test:{
        db: 'mongodb://localhost/fujitora-test',
        rootPath:rootPath,
        port:process.env.PORT || 8080,
        baseUrl: process.env.BASE_URL || 'http://localhost:8080/'
    }
};
