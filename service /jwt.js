const koaJwt = require("koa-jwt");
const jwt = require("jsonwebtoken");
const User = require("../schemas/userShema");
const invalidError = require('./invalidError')
module.exports = async function jwtVerifucation(ctx, next) {
  const token = ctx.request.headers.authorization;
  const decodeToken = jwt.decode(token);
  const test = jwt.verify(token, 'myKey', function(err){
    if(err.name === 'TokenExpiredError'){
      return 'TokenExpiredError'
    }
    
  })
  
  if (decodeToken !== null) {
    const userFind = await User.User.find({ id: decodeToken.id });
    if (
      userFind[0] !== undefined &&
      test !== 'TokenExpiredError'
    ) {
      return next();
    } else {
     invalidError.invalidError(ctx)
    }
  } else {
    invalidError.invalidError(ctx)
  }
};
