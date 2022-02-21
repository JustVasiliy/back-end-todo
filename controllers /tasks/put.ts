import * as jwt from "jsonwebtoken";
const { User } = require("../../schemas/userShema");
const { Task } = require("../../schemas/tasksSchema");
const { resEnd } = require("../../service /resEnd");
import * as Koa from "koa";
import { bodyPut } from "../../service /types";
module.exports = {
  put: async function (ctx: Koa.Context) {
    const header: string | undefined = ctx.request.headers.authorization;
    const headerAuth: any = jwt.decode(`${header}`);

    const body: bodyPut = ctx.request.body;

    const userFind: any = await User.find({ id: headerAuth.id });

    await Task.update({ id: body.id, nickname: userFind[0].id }, body);
    ctx.response.status = 200;
    ctx.body = resEnd(ctx.request.method);
  },
};
