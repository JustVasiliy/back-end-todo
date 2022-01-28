const jwt = require("jsonwebtoken");
const User = require("../../schemas/userShema.js");
const Task = require("../../schemas/tasksSchema.js");
const resEnd = require("../../service /resEnd.js");
const invalid = require("../../service /invalidError.js");
module.exports = {
  put: async function (ctx) {
    const header = ctx.request.headers.authorization;
    const headerAuth = jwt.decode(header);

    const body = ctx.request.body;

    const userFind = await User.User.find({ id: headerAuth.id });

    await Task.Task.update({ id: body.id, nickname: userFind[0].id }, body);

    ctx.response.status = 200;
    ctx.body = resEnd.resEnd(ctx.request.method);
  },
};
