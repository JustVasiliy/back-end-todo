const jwt = require("jsonwebtoken");
const User = require("../schemas/userShema.js");
const Task = require("../schemas/tasksSchema.js");
const resEnd = require("../service /resEnd.js");
const invalid = require("../service /invalidError.js");
module.exports = {
  put: async function (ctx) {
    const header = ctx.request.headers.authorization;
    const headerAuth = jwt.decode(header);
    let body = "";
    if (headerAuth !== null) {
      const userFind = await User.User.find({ id: headerAuth.id });
      //user will need authorization after 15 minutes
      console.log(userFind.id);
      if (
        userFind[0] !== undefined &&
        Date.now() / 1000 - headerAuth.exp <= 900
      ) {
        body = ctx.request.body;
        await Task.Task.update({ id: body.id, nickname: userFind[0].id }, body);

        ctx.response.status = 200;
        ctx.body = resEnd.resEnd(req.method);
      } else {
        invalid.invalidError(ctx)
      }
    } else {
      invalid.invalidError(ctx)
    }
  },
};
