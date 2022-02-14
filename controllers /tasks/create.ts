import * as jwt from "jsonwebtoken";
const { Task } = require("../../schemas/tasksSchema");
const { resEnd } = require("../../service /resEnd");
import * as Koa from "koa";
import { bodyCreate } from "../../service /types";
module.exports = {
  create: async function (ctx: Koa.Context) {
    const bodyCreate: bodyCreate = ctx.request.body;

    bodyCreate.id = `${new Date()}`;

    const token: any = jwt.decode(bodyCreate.token);
    const Todo = new Task({
      name: bodyCreate.name,
      checked: bodyCreate.checked,
      deleted: bodyCreate.deleted,
      id: bodyCreate.id,
      createdBy: token.id,
    });

    Todo.save();
    ctx.response.status = 200;
    ctx.body = JSON.stringify(resEnd(ctx.request.method));
  },
};
