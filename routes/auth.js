const {generalTokenGenerator, tokenValidater} = require('../services/auth_service')
const {users} = require('../models/index')

const PROVIDER_MAPPING = {
  "kakao": "kakao_token",
  "facebook": "fb_token"
}

exports.signUp = async(req, res, next) => {
  inputUserInfo = req.body;
  for(object of inputUserInfo.oauth_token){
    if (object.token === 'null' || object.token === null) continue;
    inputUserInfo[object.provider] = object.token;
  }
  delete inputUserInfo.oauth_token;
  try {
    usrs = users.findAll({
      where: {
        email: inputUserInfo.email
      }
    });
  } catch (err) {
    if (!(err instanceof EmptyResultError)) return next(err);
  }
  try{
    let user = await users.create(inputUserInfo);
    generalTokenGenerator({user_id:  user.id}, (err, token) => {
      if (err){
        return next(err);
      }
      user.token = token;
      user.save();

      res.status(201).json({
        'msg': 'success',
        'token': token
      })
    });
  } catch (err){
      return next(err);
  }
}

exports.signIn = async(req, res, next) => {
  inputUserInfo = req.body;

  for(object of inputUserInfo.oauth_token){
    if (object.token === 'null' || object.token === null) continue;
    inputUserInfo[object.provider] = object.token;
  }
  delete inputUserInfo.oauth_token;
  let user = null;
  try{
    user = await users.findAll({where:{email: inputUserInfo.email}});
    if (user.token === null){
      generalTokenGenerator({user_id:  user.id}, (err, token) => {
        if (err){
          return next(err);
        }
        user.token = token;
        user.save();
  
        res.status(200).json({
          'msg': 'success',
          'token': token
        })
      });
    } else {
      res.status(200).json({
        'msg': 'success',
        'token': user.token
      })
    }
  }
  catch (err){
    return next(err);
  }
}