module.exports = function beaderToken (req, res, next) {
  let token = null

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    token = req.query.token
  }

  req.token = token
  next()
}
