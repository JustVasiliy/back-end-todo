const jwt = require("jsonwebtoken");
const User = require("../schemas/userShema.js");
const Task = require("../schemas/tasksSchema.js");
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
        res.end(JSON.stringify( { success: false, message: "Invalid token", "status": 401 }));
      }
    } else {
      res.end(JSON.stringify( { success: false, message: "Invalid token","status": 401 }));
    }
  },
};
