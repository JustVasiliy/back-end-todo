const jwt = require("jsonwebtoken");
const { User } = require("../schemas/userShema");
const { invalidError } = require("./invalidError");
module.exports = async function jwtVerifucation(ctx, next) {
  const token = ctx.request.headers.authorization;
  const decodeToken = jwt.decode(token);
  const jwtVerify = jwt.verify(token, "myKey", function (err) {
    if (err !== null) {
      return "TokenExpiredError";
    }
  });

  if (decodeToken !== null) {
    const userFind = await User.find({ id: decodeToken.id });

    if (userFind[0] !== undefined && jwtVerify !== "TokenExpiredError") {
      return next();
    } else {
      console.log("here");
      invalidError(ctx);
    }
  } else {
    invalidError(ctx);
  }
};
