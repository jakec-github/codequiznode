const jwt = require('express-jwt')

const JWTsecret = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : 'password123'

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1]
  }
  return null
}

// secret needs to be replaced in all locations with an env variable
const auth = {
  required: jwt({
    secret: JWTsecret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: JWTsecret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
}

// module.exports = auth
module.exports.JWTsecret = JWTsecret
module.exports.auth = auth
