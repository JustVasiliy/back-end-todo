const jwt = require("jsonwebtoken");
const User = require("../schemas/userShema.js");
const Task = require("../schemas/tasksSchema.js");
const invalid = require('../service /invalidError.js');
module.exports = {
  todos: async function (req, res) {
    const header = req.headers.authorization;
    const headerAuth = jwt.decode(header);
    if (headerAuth !== null) {
      const userFind = await User.User.find({ id: headerAuth.id });
      //user will need authorization after 15 minutes
      if (userFind[0] !== undefined && (Date.now()/1000 - headerAuth.exp) <= 900) {
        const getTodos = async function getTodos() {
          const result = await Task.Task.find({ deleted: false, nickname: headerAuth.id });
          res.end(JSON.stringify(result));
        };
        await getTodos();
      } else {
        invalid.invalidError(res, 401);
      }
    } else {
      invalid.invalidError(res, 401);
    }
  },
};
