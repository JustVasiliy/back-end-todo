const { Task } = require("../schemas/tasksSchema");
import * as Koa from "koa";
import { bodyCreate } from "./types";
const getTodos = async function getTodos(headerAuth: any, ctx: Koa.Context) {
  const result: bodyCreate[] = await Task.find({
    deleted: false,
    createdBy: headerAuth.id,
  });
  ctx.response.status = 200;
  ctx.body = JSON.stringify(result);
};

module.exports = getTodos;
