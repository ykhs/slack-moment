const path = require('path');
const express = require('express');

const config = require('./');
const middlewares = require('./middlewares');
const controllers = require('../app/controllers');

module.exports = function (app) {
  app.use(express.static(path.join(config.root, 'public')))

  app.get('/favicon.ico', controllers.sendEmpty)
  app.get('/', controllers.renderDefault)
  app.get('/channels', controllers.renderDefault)
  app.get('/channels/:id', controllers.renderDefault)

  app.get('/auth/slack',
    middlewares.oauth2Client,
    controllers.authSlack
  )

  app.get('/auth/slack/callback',
    middlewares.oauth2Client,
    controllers.authSlackCallback
  )

  app.get('/slack/channels',
    middlewares.bearerToken,
    controllers.slackChannels
  )

  app.get('/slack/channels/:id/history',
    middlewares.bearerToken,
    controllers.slackChannelsHistory
  )

  app.get('/slack/members',
    middlewares.bearerToken,
    controllers.slackMembers
  )

  app.get('/slack/team_info',
    middlewares.bearerToken,
    controllers.slackTeamInfo
  )

  app.use((req, res, next) => {
    res.status(404).render('404')
  })

  app.use((err, req, res) => {
    console.log(err.stack)
    res.status(err.status || 500).render('500')
  })
}
