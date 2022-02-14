import * as jwt from "jsonwebtoken";
const getTodos = require("../../service /getTodos");
import * as Koa from "koa";
module.exports = {
  todos: async function (ctx: Koa.Context) {
    const header: string | undefined = ctx.request.headers.authorization;
    const headerAuth: any = jwt.decode(`${header}`);

    await getTodos(headerAuth, ctx);
  },
};
