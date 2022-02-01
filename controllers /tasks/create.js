const jwt = require("jsonwebtoken");
const { Task } = require("../../schemas/tasksSchema.js");
const { resEnd } = require("../../service /resEnd.js");

module.exports = {
  create: async function (ctx) {
    const bodyCreate = ctx.request.body;

    bodyCreate.id = new Date();

    const token = jwt.decode(bodyCreate.token);
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
