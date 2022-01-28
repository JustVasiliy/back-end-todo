const jwt = require("jsonwebtoken");
const User = require("../../schemas/userShema.js");
const Task = require("../../schemas/tasksSchema.js");
const resEnd = require("../../service /resEnd.js");
const invalid = require("../../service /invalidError.js");
module.exports = {
  create: async function (ctx) {
    const header = ctx.request.headers.authorization;
    const headerAuth = jwt.decode(header);
    const bodyCreate = ctx.request.body;

    bodyCreate.id = new Date();

    const token = jwt.decode(bodyCreate.token);
    console.log(token);
    const Todo = new Task.Task({
      name: bodyCreate.name,
      checked: bodyCreate.checked,
      deleted: bodyCreate.deleted,
      id: bodyCreate.id,
      createdBy: token.id,
    });

    Todo.save();
    ctx.response.status = 200;
    ctx.body = JSON.stringify(resEnd.resEnd(ctx.request.method));
  },
};
