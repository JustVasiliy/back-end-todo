const jwt = require("jsonwebtoken");
const User = require("../schemas/userShema.js");
const Task = require("../schemas/tasksSchema.js");
const resEnd = require("../service /resEnd.js");

module.exports = {
  put: async function (req, res) {
    const header = req.headers.authorization;
    const headerAuth = jwt.decode(header);
    let body = "";
    if (headerAuth !== null) {
      const userFind = await User.User.find({ nickname: headerAuth.nickname });
      //user will need authorization after 15 minutes
      if (
        userFind[0] !== undefined &&
        Date.now() / 1000 - headerAuth.exp <= 900
      ) {
        req.on("data", async (chunk) => {
          body += chunk;
          body = JSON.parse(body);
          await Task.Task.update({ id: body.id }, body);
        });

        res.end(resEnd.resEnd(req.method));
      } else {
        res.end(
          JSON.stringify({
            success: false,
            message: "Invalid token",
            status: 401,
          })
        );
      }
    } else {
      res.end(
        JSON.stringify({
          success: false,
          message: "Invalid token",
          status: 401,
        })
      );
    }
  },
};
