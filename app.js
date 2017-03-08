import express from 'express'
import debugModule from 'debug'
import * as config from './config'

const port = process.env.PORT || 9000
const app = express()
const debug = debugModule('slack-moment:app')

module.expots = app

config.express(app)
config.firebase()
config.routes(app)

listen()

function listen () {
  if (app.get('env') === 'test') return
  app.listen(port)
  debug(`server started on port ${port}`)
}
