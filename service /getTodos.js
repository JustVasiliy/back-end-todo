const { Task } = require("../schemas/tasksSchema");
const getTodos = async function getTodos(headerAuth, ctx) {
  const result = await Task.find({
    deleted: false,
    createdBy: headerAuth.id,
  });
  ctx.response.status = 200;
  ctx.body = JSON.stringify(result);
};

module.exports = getTodos;
