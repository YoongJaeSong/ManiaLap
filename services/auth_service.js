const jwt = require("jsonwebtoken");
require('dotenv').config();

MANIA_TOKEN_SECRET_KEY = process.env.AUTH_SIGN_KEY;

class AuthService {};

AuthService.generalTokenGenerator = (payload, callback) => {
  token_options = {
    algorithm: 'HS256',
    expiresIn: 60 * 60 * 24 * 7
  }
  let token = null;
  try {
    token = jwt.sign(payload, MANIA_TOKEN_SECRET_KEY, token_options);
  }
  catch(err) {
    console.log('sign_error');
    return callback(err);
  }
  return callback(null, token);
} 

AuthService.tokenValidater = (token, callback) => {
   jwt.verify(token, MANIA_TOKEN_SECRET_KEY, (err, decoded_token) => {
      if (err){
        return callback({isValid: false});
      }
      return callback({isValid: true, token: decoded_token});
      UnauthorizedUser
   });
}

AuthService.authHandler = (req, res, next) => {
  let token = req.headers['mania-token'];
  if(token) {
    AuthService.tokenValidater(token, (result) => {
      if(result.isValid === false){
        return next({status:400, message: "Invalid Mania Token"});
      }
      req.authInfo = result.token;
      return next();
    });
  } else {
    return next({status:401, message: "Unauthorized User"});
  }
}

module.exports = AuthService;