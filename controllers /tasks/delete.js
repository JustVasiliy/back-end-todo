const jwt = require("jsonwebtoken");
const User = require("../../schemas/userShema.js");
const Task = require("../../schemas/tasksSchema.js");
const resEnd = require("../../service /resEnd.js");
const invalid = require("../../service /invalidError.js");
module.exports = {
  delete: async function (ctx) {
    const header = ctx.request.headers.authorization;
    const headerAuth = jwt.decode(header);
    const userFind = await User.User.find({ id: headerAuth.id });
    bodyDelete = ctx.request.body;
    await Task.Task.update(
      { id: bodyDelete.id, nickname: userFind[0].id },
      { deleted: true }
    );

    ctx.body = resEnd.resEnd(ctx.request.method);
    ctx.response.status = 200;
  },
};
