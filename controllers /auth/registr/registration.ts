const User = require("../../../schemas/userShema");
import * as Koa from "koa";
import * as jwt from "jsonwebtoken";
import { userInfo, bodyNewUser } from "../../../service /types";

module.exports = {
  newUser: async function (ctx: Koa.Context) {
    let token: string = "";

    let bodyNewUser: bodyNewUser = ctx.request.body;

    const findUser: bodyNewUser[] = await User.User.find({
      nickname: bodyNewUser.nickname,
    });
    if (
      findUser[0] === undefined &&
      bodyNewUser.name.trim() !== "" &&
      bodyNewUser.surname.trim() !== "" &&
      bodyNewUser.nickname.trim() !== "" &&
      bodyNewUser.password.trim() !== ""
    ) {
      const userInfo: userInfo = {
        nickname: bodyNewUser.nickname,
        id: bodyNewUser.id,
      };
      token = jwt.sign(userInfo, "myKey");
      let user = new User.User({
        name: bodyNewUser.name,
        surname: bodyNewUser.surname,
        nickname: bodyNewUser.nickname,
        password: bodyNewUser.password,
        id: bodyNewUser.id,
      });
      user.save();
    } else {
      token = "This nickname already exists";
    }
    ctx.body = token;
  },
};
