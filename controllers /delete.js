const jwt = require("jsonwebtoken");
const User = require("../schemas/userShema.js");
const Task = require("../schemas/tasksSchema.js");
const resEnd = require("../service /resEnd.js");
const invalid = require("../service /invalidError.js");
module.exports = {
  delete: async function (ctx) {
    const header = ctx.request.headers.authorization;
    const headerAuth = jwt.decode(header);
    if (headerAuth !== null) {
      const userFind = await User.User.find({ id: headerAuth.id });
      //user will need authorization after 15 minutes
      if (
        userFind[0] !== undefined &&
        Date.now() / 1000 - headerAuth.exp <= 900
      ) {
        bodyDelete = ctx.request.body;
        await Task.Task.update(
          { id: bodyDelete.id, nickname: userFind[0].id },
          { deleted: true }
        );

        ctx.body = resEnd.resEnd(ctx.request.method);
        ctx.response.status = 200;
      } else {
        invalid.invalidError(ctx)
      }
    } else {
      invalid.invalidError(ctx)
    }
  },
};
