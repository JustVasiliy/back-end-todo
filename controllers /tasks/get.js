const jwt = require("jsonwebtoken");
const User = require("../../schemas/userShema.js");
const Task = require("../../schemas/tasksSchema.js");
const invalid = require("../../service /invalidError.js");

const KoaRouter = require("koa-router");
const router = new KoaRouter();

module.exports = {
  todos: async function (ctx) {
    const header = ctx.request.headers.authorization;
    const headerAuth = jwt.decode(header);

    const getTodos = async function getTodos() {
      const result = await Task.Task.find({
        deleted: false,
        createdBy: headerAuth.id,
      });
      ctx.response.status = 200;
      ctx.body = JSON.stringify(result);
    };
    await getTodos();
  },
};
