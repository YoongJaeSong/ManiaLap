const jwt = require("jsonwebtoken");
const fs = require("fs")
const {generalTokenGenerator, tokenValidater, authHandler} = require('./auth_service');

generalTokenGenerator({userId: 100, designerId:10}, (err, result) => {
  if (err) {
    console.log(err);
    return null;
  }
  console.log("token : " + result);
});