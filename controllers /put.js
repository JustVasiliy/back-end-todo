const jwt = require("jsonwebtoken");
const User = require("../schemas/userShema.js");
const Task = require("../schemas/tasksSchema.js");
const resEnd = require("../service /resEnd.js");
const invalid = require('../service /invalidError.js');
module.exports = {
  put: async function (req, res) {
    const header = req.headers.authorization;
    const headerAuth = jwt.decode(header);
    let body = "";
    if (headerAuth !== null) {
      const userFind = await User.User.find({ id: headerAuth.id });
      //user will need authorization after 15 minutes
      console.log(userFind.id)
      if (
        userFind[0] !== undefined &&
        Date.now() / 1000 - headerAuth.exp <= 900
      ) {
        req.on("data", async (chunk) => {
          body += chunk;
          body = JSON.parse(body);
          await Task.Task.update({ id: body.id, nickname:userFind[0].id }, body);
        });

        res.end(resEnd.resEnd(req.method));
      } else {
        invalid.invalidError(res, 401);
        
      }
    } else {
      invalid.invalidError(res, 401);
      
    }
  },
};
