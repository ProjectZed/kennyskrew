var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'kennyskrew'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/kennyskrew-development',
    storage: rootPath + '/data/kennyskrew-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'kennyskrew'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/kennyskrew-test',
    storage: rootPath + '/data/kennyskrew-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'kennyskrew'
    },
    port: process.env.PORT,
    db: 'sqlite://localhost/kennyskrew-production',
    storage: rootPath + 'data/kennyskrew-production'
  }
};

module.exports = config[env];
