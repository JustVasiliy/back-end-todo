import * as jwt from "jsonwebtoken";
import * as Koa from "koa";
const { User } = require("../schemas/userShema");
const { invalidError } = require("./invalidError");
module.exports = async function jwtVerifucation(
  ctx: Koa.Context,
  next: Koa.Next
) {
  const token: string | undefined = ctx.request.headers.authorization;

  const decodeToken: any = jwt.decode(`${token}`);

  const jwtVerify: any = jwt.verify(`${token}`, "myKey", function (err) {
    if (err !== null) {
      return "TokenExpiredError";
    }
  });

  if (decodeToken !== null) {
    const userFind: any = await User.find({ id: decodeToken.id });

    if (userFind[0] !== undefined && jwtVerify !== "TokenExpiredError") {
      return next();
    } else {
      invalidError(ctx);
    }
  } else {
    invalidError(ctx);
  }
};
