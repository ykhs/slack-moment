const path = require('path');
const express = require('express');
const debugModule = require('debug');

if (process.env.NODE_ENV !== 'production') {
  const envPath = path.resolve('..', '..', '.env');

  require('dotenv').config({
    path: envPath
  });
}

const port = process.env.PORT || 9000;
const app = express();
const debug = debugModule('slack-moment:app');

module.expots = app;

require('../config/express')(app);
require('../config/firebase')();
require('../config/routes')(app);

listen();

function listen() {
  if (app.get('env') === 'test') return;
  app.listen(port);
  debug(`server started on port ${port}`);
}
