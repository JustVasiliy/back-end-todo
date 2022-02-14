import * as jwt from "jsonwebtoken";
import * as Koa from "koa";
const { User } = require("../../schemas/userShema");
const { Task } = require("../../schemas/tasksSchema");
const { resEnd } = require("../../service /resEnd");

module.exports = {
  remove: async function (ctx: Koa.Context) {
    const header: string | undefined = ctx.request.headers.authorization;
    const headerAuth: any = jwt.decode(`${header}`);
    const userFind = await User.find({ id: headerAuth.id });
    let bodyDelete = ctx.request.body;
    await Task.update(
      { id: bodyDelete.id, nickname: userFind[0].id },
      { deleted: true }
    );

    ctx.body = resEnd(ctx.request.method);
    ctx.response.status = 200;
  },
};
