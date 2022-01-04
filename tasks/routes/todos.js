const jwt = require("jsonwebtoken");
const User = require("../../users/userShema.js");
const Task = require("../tasksSchema.js");
module.exports = {
  todos: async function (req, res) {
    const header = req.headers.authorization;
    const headerAuth = jwt.decode(header);
    if (headerAuth !== null) {
      const userFind = await User.User.find({ nickname: headerAuth.nickname });
      //user will need authorization after 15 minutes
      if (userFind[0] !== undefined && (Date.now()/1000 - headerAuth.exp) <= 900) {
        const getTodos = async function getTodos() {
          const result = await Task.Task.find({ deleted: false, nickname: headerAuth.nickname });
          res.end(JSON.stringify(result));
        };
        await getTodos();
      } else {
        res.end(JSON.stringify("You don't have a token"));
      }
    } else {
      res.end("wait");
    }
  },
};
