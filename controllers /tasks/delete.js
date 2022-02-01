const jwt = require("jsonwebtoken");
const { User } = require("../../schemas/userShema.js");
const { Task } = require("../../schemas/tasksSchema.js");
const { resEnd } = require("../../service /resEnd.js");

module.exports = {
  remove: async function (ctx) {
    const header = ctx.request.headers.authorization;
    const headerAuth = jwt.decode(header);
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
