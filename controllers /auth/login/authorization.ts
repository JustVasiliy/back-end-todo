const { User } = require("../../../schemas/userShema");
import * as jwt from "jsonwebtoken";
const jwtExpDate = require("../../../service /jwtExpDate");
import * as Koa from "koa";
import { userInfo, bodyAuth, bodyNewUser } from "../../../service /types";

module.exports = {
  authorization: async function (ctx: Koa.Context) {
    const bodyRequest: bodyAuth = ctx.request.body;
    const findUser: bodyNewUser[] = await User.find(bodyRequest);

    let token: string;
    if (
      findUser[0] !== undefined &&
      bodyRequest.nickname.trim() !== "" &&
      bodyRequest.nickname.trim() !== ""
    ) {
      const userInfo: userInfo = {
        nickname: bodyRequest.nickname,
        id: `${findUser[0].id}`,
      };
      token = jwt.sign(userInfo, "myKey", { expiresIn: jwtExpDate(60) });
    } else {
      token = "You need registration!";
    }

    ctx.body = token;
  },
};
