import path from 'path'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import basicAuth from 'basic-auth-connect'
import config from './'

export default function (app) {
  if (config.env !== 'test') {
    app.use(morgan('dev'))
  }

  app.set('views', path.join(config.root, 'app', 'views'))
  app.set('view engine', 'pug')

  if (config.basicAuth) {
    const [username, password] = config.basicAuth.split(':')
    app.use(basicAuth(username, password))
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
}
