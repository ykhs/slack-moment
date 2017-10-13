const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth-connect');
const config = require('./');

module.exports = function (app) {
  if (config.env !== 'test') {
    app.use(morgan('dev'))
  }

  app.set('views', path.join(config.root, 'views'))
  app.set('view engine', 'pug')

  if (config.basicAuth) {
    const [username, password] = config.basicAuth.split(':')
    app.use(basicAuth(username, password))
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
}
